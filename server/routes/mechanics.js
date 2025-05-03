const express = require('express');
const {registerMechanic}=require("../controllers/mechanicController")
const router = express.Router();

router.post('/mechReg',registerMechanic)

module.exports=router;