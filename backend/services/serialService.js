const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const Events = require("../model/datamodel")

let currentPort = null;

function startSerial(io) {

  async function connectSerial() {

    if (currentPort && currentPort.isOpen) return;

    try {

      const ports = await SerialPort.list();

      const target = ports.find(
        p =>
          p.vendorId?.toLowerCase() === "10c4" ||
          p.manufacturer?.toLowerCase().includes("silicon labs")
      );

      if (!target) {
        console.log("CP2102 device not found. Retrying in 5 seconds...");
        return;
      }

      console.log("Connecting to serial device:", target.path);

      currentPort = new SerialPort({
        path: target.path,
        baudRate: 115200,
        autoOpen: false
      });

      const parser = currentPort.pipe(
        new ReadlineParser({ delimiter: "\n" })
      );

      currentPort.open(err => {

        if (err) {
          console.log("Error opening port:", err.message);
          currentPort = null;
          return;
        }

        console.log("Serial Port Connected:", target.path);

      });

      parser.on("data", async line => {

        const statusIndex = line.indexOf("<STATUS");
        if (statusIndex === -1) return;

        let cleaned = line.substring(statusIndex).trim();

        if (!cleaned.endsWith(">")) return;

        try {

          const rawData = cleaned.slice(1, -1).split(",");

          const [
            tag,
            latency,
            type,
            typeStr,
            hId,
            tId,
            lat,
            lon,
            status,
            statusStr,
            msgId,
            respCode,
            respBool
          ] = rawData;

          const eventData = {
            latency_ms: latency,
            type: Number(type),
            type_str: typeStr,
            handheld_id: Number(hId),
            tower_id: Number(tId),
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            status: Number(status),
            status_str: statusStr,
            msg_id: Number(msgId),
            response_code: Number(respCode),
            response_bool: respBool === "1" || respBool === "true"
          };

          const event = await Events.findOneAndUpdate(
            {
              handheld_id: eventData.handheld_id,
              tower_id: eventData.tower_id
            },
            eventData,
            {
              new: true,
              upsert: true
            }
          );

          io.emit("event_update", event);

          console.log(
           "Event updated from handheld:",
            eventData.handheld_id
          );

        } catch (err) {

          console.log("Parsing error:", err.message);

        }

      });

      currentPort.on("close", () => {

        console.log("Serial port closed. Reconnecting...");
        currentPort = null;

      });

      currentPort.on("error", err => {

        console.log("Serial error:", err.message);
        currentPort = null;

      });

    } catch (error) {

      console.log("Serial scanning error:", error.message);

    }

  }

  setInterval(connectSerial, 5000);

  connectSerial();

}

function sendResponsePacket(handheld_id, msg_id, response_code) {
  console.log(handheld_id, msg_id, response_code);
  if (!currentPort || !currentPort.isOpen) {
    console.log("Serial not connected");
    return false;
  }

  const packet_type = 2; // REQUIRED
  const packet = `<RESP,${handheld_id},${msg_id},${packet_type},${response_code}>`;

  currentPort.write(packet + "\n", (err) => {
    if (err) {
      console.log("Serial write error:", err.message);
    } else {
      console.log("Sent to ESP32:", packet);
    }
  });

  return true;
}


module.exports ={
  startSerial,
  sendResponsePacket
};