const express = require('express');
const router = express.Router();
const {registerMechanic,getAllMechanics,updateMechanic,deleteMechanic, toggleLike, getLikedMechanics}=require("../controllers/mechanicController")
const authMiddleware = require('../middleware/authMiddleware');


router.post('/mechReg',registerMechanic)
router.get('/mechGetAll',getAllMechanics)
router.patch('/mechUpdate/:id',updateMechanic)
router.delete('/mechDelete/:id',deleteMechanic)
router.patch('/mechLike/:id',authMiddleware,toggleLike)
router.get('/mechanics/liked',authMiddleware,getLikedMechanics)

module.exports=router;