const express = require('express');
const router = express.Router();
const actividad = require('../Modelos/actividades');
const mongoose = require('mongoose');

/*Login*/
router.get('/', (req, res) => {
  res.render('login');
  
});

router.post('/acceder', (req, res) => {
  const info = req.body;
  console.log(req.body);
  
  if(req.body.username == 'neuron' && req.body.password == "12345"){
  const informacion = actividad.find(
        function(err, datos) {
  	    if(err) return console.error(err);
            console.log(datos);
            res.render('principal', {tuplas: datos});
	});
   }else
     res.render('login');
});

/*Renderiza la pagina principal.ejs*/
router.get('/', (req, res) => {
  const informacion = actividad.find(
        function(err, datos) {
  	    if(err) return console.error(err);
            console.log(datos);
            res.render('principal', {tuplas: datos});
	});
});

/*Recibe el POST enviado por el boton Agregar*/
router.post('/Agregar', (req, res) => {				
  const datos = new actividad(req.body);				//Le asigna automaticamente la id al registrar un dato. req.body agrega los datos que recibe de los input al objeto.
  datos.save(function(err, datos) {
  if (err) return console.error(err);
  });
  res.redirect('/');
  
});

/*Buscar elementos*/
/*Recibe el POST enviado por el boton Agregar*/
router.post('/Buscar', (req, res) => {	
  const dato_input_busqueda=req.body.busqueda;

  const dato_seleccionado=req.body.selector;
  const cadena = "";

  if (dato_seleccionado == 0){
  actividad.find(function(err, datos) {if(err) return console.error(err);res.render('principal', {tuplas: datos});});
  }
  if (dato_seleccionado == 1){
  actividad.find({nombre:dato_input_busqueda}, function(err, datos) {if(err) return console.error(err);res.render('principal', {tuplas: datos});});
  }
  if (dato_seleccionado == 2){
  actividad.find({telefono:dato_input_busqueda}, function(err, datos) {if(err) return console.error(err);res.render('principal', {tuplas: datos});});
  }
  if (dato_seleccionado == 3){
  actividad.find({email:dato_input_busqueda}, function(err, datos) {if(err) return console.error(err);res.render('principal', {tuplas: datos});});
  }
  if (dato_seleccionado == 4){
  actividad.find({apellidos:dato_input_busqueda}, function(err, datos) {if(err) return console.error(err);res.render('principal', {tuplas: datos});});
  }
});

/*Actualizar dato*/
router.get('/Actualizar/:nombre', (req, res) => {
  const id = req.params;
  console.log (id);
  const tupla = actividad.find(id, function(err, datos) {if(err) return console.error(err);res.render('editar', {tuplas: datos});});
 
});

router.post('/Actualizar/:nombre', (req, res) => {
  const id = req.params;
  
  const tupla = actividad.update(id, req.body, function(err, datos) {if(err) return console.error(err);res.redirect('/');});
  
});

/*Elimina los elementos de la tabla*/
router.get('/Eliminar/:nombre', (req, res) => {
  const id = req.params;
  console.log(req.params);
  console.log(id);
  actividad.remove(id,function(err, datos) {if(err) return console.error(err);} );
  res.redirect('/');
  
});



module.exports = router;				//Brinda el uso del objeto router en otros archivos


