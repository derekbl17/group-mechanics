const mongoose = require('mongoose');

const mechanicSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true, unique: true },
  specialty: { type: String, required: true },
  photo: {type: String, required: true},
  workshop:{type: String, required: true},
  city:{type: String, required: true}
});

module.exports = mongoose.model('Mechanic', mechanicSchema);
