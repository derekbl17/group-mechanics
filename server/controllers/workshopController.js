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

exports.deleteWorkshop = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedWorkshop = await Workshop.findByIdAndDelete(id);

    if (!deletedWorkshop) {
      return res.status(404).json({ message: 'Workshop not found' });
    }

    res.status(200).json({ message: 'Workshop deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting Workshop' });
  }
}

exports.updateWorkshop = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedWorkshop = await Workshop.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedWorkshop) {
      return res.status(404).json({ message: 'Workshop not found' });
    }

    res.status(200).json({ message: 'Workshop updated successfully', workshop: updatedWorkshop });
  } catch (err) {
    res.status(500).json({ message: 'Error updating mechanic' });
  }
}