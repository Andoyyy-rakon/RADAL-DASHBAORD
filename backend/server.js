require("dotenv").config();
const express = require("express");
const familyInfoRouter = require("./router/familyInfoRouter")
const connectToDatabase = require("./database/db");
const cors = require("cors");
const http = require("http");
const {Server} =require("socket.io")

const app = express();
app.use(cors())
app.use(express.json());

connectToDatabase()

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});


io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);
});

app.set("io", io);



app.use("/users",familyInfoRouter)



server.listen(process.env.PORT,()=>{
    console.log("The server is running in Port", process.env.PORT);
})