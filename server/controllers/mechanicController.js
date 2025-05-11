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


exports.deleteMechanic = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMechanic = await Mechanic.findByIdAndDelete(id);

    if (!deletedMechanic) {
      return res.status(404).json({ message: 'Mechanic not found' });
    }

    res.status(200).json({ message: 'Mechanic deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting mechanic' });
  }
}

exports.updateMechanic = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedMechanic = await Mechanic.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedMechanic) {
      return res.status(404).json({ message: 'Mechanic not found' });
    }

    res.status(200).json({ message: 'Mechanic updated successfully', mechanic: updatedMechanic });
  } catch (err) {
    res.status(500).json({ message: 'Error updating mechanic' });
  }
}

exports.toggleLike=async(req,res)=>{
  // const mechanicId = req.params.id;
  // const userId = req.user._id;

  
  // try {
  //   const mechanic = await Mechanic.findById(mechanicId);

  //   // If the mechanic already has the user in the likes array, remove them (unlike)
  //   if (mechanic.likes.includes(userId)) {
  //     mechanic.likes = mechanic.likes.filter((id) => id !== userId); // Remove userId
  //   } else {
  //     mechanic.likes.push(userId); // Add userId to the likes array
  //   }

  //   await mechanic.save(); // Save the updated mechanic
  //   res.status(200).json(mechanic); // Respond with the updated mechanic
  // } catch (err) {
  //   res.status(500).json({ message: 'Error toggling like' });
  // }
  try {
    // Make sure we have the user ID from authentication middleware
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: 'User not authenticated properly' });
    }
    
    const userId = req.user._id.toString(); // Convert ObjectId to string if needed
    const mechanicId = req.params.id;
    
    console.log(`Toggle like - User: ${userId}, Mechanic: ${mechanicId}`);
    
    // Find the mechanic
    const mechanic = await Mechanic.findById(mechanicId);
    
    if (!mechanic) {
      return res.status(404).json({ error: 'Mechanic not found' });
    }
    
    // Initialize likes array if it doesn't exist
    if (!Array.isArray(mechanic.likes)) {
      mechanic.likes = [];
    }
    
    // Check if this user already liked this mechanic
    const likeIndex = mechanic.likes.findIndex(id => 
      id && id.toString() === userId
    );
    
    if (likeIndex === -1) {
      // User hasn't liked this mechanic, add the like
      console.log(`Adding user ${userId} to likes`);
      mechanic.likes.push(userId);
    } else {
      // User already liked this mechanic, remove the like
      console.log(`Removing user ${userId} from likes`);
      mechanic.likes.splice(likeIndex, 1);
    }
    
    // Save the updated mechanic
    await mechanic.save();
    
    // Return the updated mechanic
    res.json({ 
      mechanic: {
        ...mechanic.toObject(),
        likes: mechanic.likes // Ensure likes array is included
      }
    });
    
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({ error: error.message });
  }
}

exports.getLikedMechanics = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      console.log("no user???", req.user)
      return res.status(401).json({ error: 'User not authenticated' });
    }
    console.log("user authenticated!", req.user)
    const mechanics = await Mechanic.find({ likes: req.user._id });
    res.status(200).json(mechanics);
  } catch (err) {
    console.error('Error fetching liked mechanics:', err);
    res.status(500).json({ error: err.message });
  }
};