const express = require('express');
const router = express.Router();
const {registerMechanic,getAllMechanics,updateMechanic,deleteMechanic}=require("../controllers/mechanicController")


router.post('/mechReg',registerMechanic)
router.get('/mechGetAll',getAllMechanics)
router.patch('/mechUpdate/:id',updateMechanic)
router.delete('/mechDelete/:id',deleteMechanic)

module.exports=router;