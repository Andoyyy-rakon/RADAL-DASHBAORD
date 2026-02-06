const express = require("express");
const {register,getAllInfo,updateInfo,dataReceive,getdataReceive,deleteuser} =require("../controllers/familyRegistration")

const router=express.Router();

router.post("/register",register);
router.get("/getAllinfo",getAllInfo)
router.put("/update/:id",updateInfo)
router.post("/events",dataReceive)
router.get("/events",getdataReceive)
router.delete("/delete/:id",deleteuser)


module.exports=router;