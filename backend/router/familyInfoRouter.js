const express = require("express");
const {register,getAllInfo,updateInfo,dataReceive,getdataReceive,deleteuser, deleteEvent} =require("../controllers/familyRegistration")
const authMiddleware = require("../middleware/authmiddleware")
const router=express.Router();

router.post("/register",authMiddleware,register);
router.get("/getAllinfo",authMiddleware,getAllInfo)
router.put("/update/:id",authMiddleware,updateInfo)
router.post("/events",dataReceive)
router.get("/events",getdataReceive)
router.delete("/delete/:id",authMiddleware,deleteuser)
router.delete("/events/delete/:id",authMiddleware,deleteEvent)

module.exports=router;