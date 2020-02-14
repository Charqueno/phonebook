const mongoose =  require('mongoose');
const esquema =  mongoose.Schema;

const actividad = new esquema({
  nombre: String,
  telefono: Number,
  email: String,
  apellidos: String,
  amigos: String
});

module.exports = mongoose.model('actividades', actividad);
