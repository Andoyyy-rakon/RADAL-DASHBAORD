require("dotenv").config();
const express = require("express");
const familyInfoRouter = require("./router/familyInfoRouter")
const authRouter = require('./router/authRouter')
const connectToDatabase = require("./database/db");
const cors = require("cors");
const http = require("http");
const {Server} =require("socket.io")
const cookieParser = require("cookie-parser");
const {startSerial} = require("./services/serialService")
const responseRoute = require("./router/responseRoute")

const app = express();

// amo ni gin add ko para sa cookie
app.use(cors({
  origin: process.env.FRONTEND_PORT || "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

connectToDatabase()

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin:process.env.FRONTEND_PORT, // bali amo ni gin change ko      origin: "*"
  },
});


io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);
});

app.set("io", io);

startSerial(io);

app.use("/users",familyInfoRouter);
app.use("/auth", authRouter);
app.use(responseRoute);


server.listen(process.env.PORT,()=>{
    console.log("The server is running in Port", process.env.PORT);
})