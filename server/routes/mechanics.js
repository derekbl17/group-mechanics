const express = require('express');
const router = express.Router();
const {registerMechanic,getAllMechanics}=require("../controllers/mechanicController")


router.post('/mechReg',registerMechanic)
router.get('/mechGetAll',getAllMechanics)

module.exports=router;