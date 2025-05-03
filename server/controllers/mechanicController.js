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