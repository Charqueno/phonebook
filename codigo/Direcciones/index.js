const express = require('express');						//Se importa el framework de express.
const router = express.Router();						//Se creo la variable de direccionamiento.
const actividad = require('../Modelos/actividades');				//Manda llamar al esquema que se creo.
const mongoose = require('mongoose');						//Se carga el módulo mongoose. SIrve como conexión entre mongoDB y node js.

/*Login*/
router.get('/', (req, res) => {							//La vista login aparecera al principio al cargar la página.
  res.render('login');								//Renderiza la vista.
  
});

/*Recibe por POST los datos ingresados por el login*/
router.post('/correcto', (req, res) => {						
  const info = req.body;							//Obtiene los datos enviados del POST
  console.log(req.body);
  
  if(req.body.username == 'neuron' && req.body.password == "12345"){		//Condición para acceder a la vista principal. Manda los datos de la BD a la vista llamada principal.ejs.
  const informacion = actividad.find(
        function(err, datos) {
  	    if(err) return console.error(err);
            console.log(datos);
            res.render('principal', {tuplas: datos});				//Le asigna los datos a una etiqueta para utilizarse en el código HTML.
	});
   }else
     res.render('login');							
});

router.get('/principal', (req, res) => {						
  
  const informacion = actividad.find(
        function(err, datos) {
  	    if(err) return console.error(err);
            console.log(datos);
            res.render('principal', {tuplas: datos});				//Le asigna los datos a una etiqueta para utilizarse en el código HTML.
	});
   							
});


/*Recibe el POST enviado por el boton Agregar*/
router.post('/Agregar', (req, res) => {				
  const datos = new actividad(req.body);				//Le asigna automaticamente la id al registrar un dato. req.body agrega los datos que recibe de los input al objeto.
  datos.save(function(err, datos) {
  if (err) return console.error(err);
  res.redirect('/principal');});
  
  
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
  
  const tupla = actividad.update(id, req.body, function(err, datos) {if(err) return console.error(err);res.redirect('/principal');});
  
});

/*Elimina los elementos de la tabla*/
router.get('/Eliminar/:nombre', (req, res) => {
  const id = req.params;
  console.log(req.params);
  console.log(id);
  actividad.remove(id,function(err, datos) {if(err) return console.error(err);} );
  res.redirect('/principal');
  
});



module.exports = router;				//Brinda el uso del objeto router en otros archivos


