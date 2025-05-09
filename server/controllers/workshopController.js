const Workshop=require('../models/Workshop')

exports.registerWorkshop=async(req,res)=>{
    const {name,city}=req.body;
    if (!name || !city) return res.status(400).json({message: 'All fields required'});

    const newWorkshop=new Workshop({name,city})

    try{
        await newWorkshop.save()
        res.status(201).json({ message: 'Workshop registered'})
    }catch(err){
    res.status(500).json({message: 'Error registering Workshop'})
  }
}

exports.getAllWorkshops=async(req,res)=>{
  try{
    const mechanics=await Workshop.find()
    res.status(200).json(mechanics)
  }catch(err) {res.status(500).json({message:"error fetching workshops from db"})}
}