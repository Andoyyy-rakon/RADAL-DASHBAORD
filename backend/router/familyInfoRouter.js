const express = require("express");
const {register,getAllInfo} =require("../controllers/familyRegistration")
const router=express.Router();

router.post("/register",register);
router.get("/getAllinfo",getAllInfo)


module.exports=router;