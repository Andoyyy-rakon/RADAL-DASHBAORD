const userInfo = require("../model/userInformation")

const register =async(req,res)=>{
    try{
        const { device_id, family_name, quantity, location} = req.body;

        const existingDevice = await userInfo.findOne({device_id});
        if(existingDevice){
            return res.status(400).json({
                success:false,
                message:"Device is already exist!"
            })
        }

        const createFamilyinfo = new userInfo({
            device_id,
            family_name,
            quantity,
            location,
        })

        await createFamilyinfo.save()

        if(createFamilyinfo){
            res.status(201).json({
                success:true,
                message:"Family information successfully register"
            })
        }else{
            res.status(400).json({
                success:false,
                message:"Unable to register Family information! Please try again"
            })
        }
    }catch(error){
    res.status(500).json({
      success: false,
      message: error.message
    });
    }
}


const getAllInfo=async(req,res)=>{
    try{
        const data =await userInfo.find({});
        if(data?.length>0){
            res.status(200).json({
                success:true,
                data
            })
        }else{
            res.status(404).json({
                succes:false,
                message:"Empty List"
            })
        }
    }catch(error){
        res.status(500).json({
            succes:false,
            message:"Something went wrong! Please try again"
        })
    }
}

module.exports ={
    register,
    getAllInfo
}