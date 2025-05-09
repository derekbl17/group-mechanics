const mongoose = require('mongoose');

const workshopSchema = new mongoose.Schema({
  name: {type:String,required:true},
  city: {type:String,required:true}
});

module.exports = mongoose.model('Workshop', workshopSchema);