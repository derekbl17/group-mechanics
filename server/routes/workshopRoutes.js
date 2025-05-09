const express = require('express');
const router = express.Router();
const {registerWorkshop,getAllWorkshops}=require('../controllers/workshopController')

router.post('/workshopReg',registerWorkshop)
router.get('/workshopGetAll',getAllWorkshops)

module.exports=router