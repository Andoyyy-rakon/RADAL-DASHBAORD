import { useState, useRef,useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function OfflineMapTest({selectedReport}) {
  const [markerPos, setMarkerPos] = useState(null);

  const mapRef = useRef(null);


useEffect(() => {

  if (!selectedReport) {
    setMarkerPos(null);
    return;
  }

  const lat = parseFloat(selectedReport.lat);
  const lon = parseFloat(selectedReport.lon);


  if (
    isNaN(lat) ||
    isNaN(lon) ||
    lat === 0 ||
    lon === 0
  ) {
    setMarkerPos(null);
    return;
  }

  setMarkerPos([lat, lon]);
  mapRef.current?.setView([lat, lon], 16);

}, [selectedReport]);



  return (

      <div className="w-full h-[320px] flex justify-center">
        <MapContainer
          center={[10.6431164, 122.9435287]}
          zoom={40}
          minZoom={14}
          maxZoom={16}
          className="h-[100%] w-[100%] "
          whenCreated={(map) => (mapRef.current = map)}
        >
          <TileLayer
            url="/tiles/{z}/{x}/{y}.png"
            minZoom={14}
            maxZoom={16}
            
          />

          {markerPos && (
            <Marker position={markerPos}>
              <Popup>
                {selectedReport?.family_info} <br />
                {selectedReport?.location}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
  );
}
