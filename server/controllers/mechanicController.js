const Mechanic=require('../models/Mechanic')

exports.registerMechanic=async(req,res)=>{
  const {firstName,lastName,specialty,photo,workshop,city}=req.body;
  if (!firstName || !lastName || !specialty || !photo || !workshop || !city) return res.status(400).json({message: 'All fields required'});

  const newMechanic=new Mechanic({firstName,lastName,specialty,photo,workshop,city})

  try{
    await newMechanic.save();
    res.status(201).json({ message: 'Mechanic registered'})
  } catch(err){
    res.status(500).json({message: 'Error registering mechanic'})
  }
}

exports.getAllMechanics=async(req,res)=>{
  try{
    const mechanics=await Mechanic.find()
    res.status(200).json(mechanics)
  }catch(err) {res.status(500).json({message:"error fetching mechanics from db"})}
}