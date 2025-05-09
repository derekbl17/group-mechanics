const express = require('express');
const router = express.Router();
const {registerWorkshop,getAllWorkshops, updateWorkshop, deleteWorkshop}=require('../controllers/workshopController')

router.post('/workshopReg',registerWorkshop)
router.get('/workshopGetAll',getAllWorkshops)
router.patch('/workshopUpdate/:id',updateWorkshop)
router.delete('/workshopDelete/:id',deleteWorkshop)

module.exports=router