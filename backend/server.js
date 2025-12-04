require("dotenv").config();
const express = require("express");
const familyInfoRouter = require("./router/familyInfoRouter")
const connectToDatabase = require("./database/db");
const cors = require("cors");

const app = express();



app.use(cors())

connectToDatabase()

app.use(express.json());

app.use("/users",familyInfoRouter)



app.listen(process.env.PORT,()=>{
    console.log("The server is running in Port", process.env.PORT);
})