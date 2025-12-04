const mongoose = require("mongoose")
require("dotenv").config()

const connectToDatabase = async ()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Database connected Successfully");
    }catch(error){
        console.log("Database connection is faild",error);
        process.exit(1);
    }
}


module.exports=connectToDatabase;
