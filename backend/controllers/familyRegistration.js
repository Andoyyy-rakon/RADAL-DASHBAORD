const userInfo = require("../model/userInformation")
const Events = require("../model/datamodel")

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

        await createFamilyinfo.save();


        const io = req.app.get("io");
        io.emit("new_record", createFamilyinfo);


        if(createFamilyinfo){
            res.status(201).json({
                success:true,
                message:"Successfully register",
                data:createFamilyinfo
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
        const data =await userInfo.find({}).sort({ createdAt: -1 });
        if(data?.length>0){
            res.status(200).json({
                success:true,
                data
            })
        }else{
            res.status(404).json({
                success:false,
                message:"Empty List"
            })
        }
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Something went wrong! Please try again"
        })
    }
}


    const updateInfo = async(req,res)=>{
        try{
            const {id} = req.params;
            const updates = req.body;
            console.log(updates)
            console.log(id)
            
            const updated = await userInfo.findByIdAndUpdate(id,updates,{new:true});
            console.log(id)
            console.log("Update")
            console.log(updated)
            if(!updated){
                console.log("error")
                return res.status(404).json({success:false,message:"Record not found"})
            }  
          
            const io = req.app.get("io");
            io.emit("record_updated",updated)
            console.log(updated._id.toString())

            res.json({success:true,data:updated});

            console.log("Successfully Update")

        }catch(error){
            console.log(error)
            res.status(500).json({
                success:false,
                message:"Update Fialed"
            })
        }

}


const dataReceive = async (req, res) => {
  try {
    const { latency_ms,type,type_str, handheld_id, tower_id, lat, lon, status, status_str, msg_id,response_code,response_bool } = req.body;

    console.log(status_str)
    const event = await Events.findOneAndUpdate(
      { handheld_id, tower_id }, 
      { latency_ms,type,type_str, lat, lon, status, status_str, msg_id,response_code,response_bool}, 
      { new: true, upsert: true }
    );

    const io = req.app.get("io");
    io.emit("event_update", event); 

    res.status(200).json({ success: true, event });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const getdataReceive = async(req,res)=>{
    try{
        const data = await Events.find({}).sort({createdAt:-1})
        
        if(data?.length>0){
            res.status(200).json({
                success:true,
                data
            })
        }
        else{
            res.status(404).json({
                success:false,
                message:"Empty List"
            })
        }
    }catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:error
        })
        
    }
}



module.exports ={
    register,
    getAllInfo,
    updateInfo,
    dataReceive,
    getdataReceive
}