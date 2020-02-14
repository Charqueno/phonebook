const express = require('express');
const servidor = express();
const ruta = require('path'); 
const morgan = require('morgan'); 
const mongoose = require('mongoose'); 


/*Conecta al servidor*/
const PORT = process.env.PORT || 3000;
servidor.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

/*Configuraciones generales*/
servidor.set('views', ruta.join(__dirname, 'views')); 			//Le indica donde se encuentra la carpeta Vistas. Crea una ruta unica sin importar el sistema operativo que se use.
servidor.set('view engine', 'ejs');					//Uso del motor de plantillas ejs.

/*Los middlewares se ejecutan antes del acceso a las rutas. Es como un preLoad*/
servidor.use(morgan('dev')); 
servidor.use(express.urlencoded({extended: false}));					//Recibe la informacion que manda el usuario al servidor. Extended en falso limita el tamano del dato que recibe.

/*Se importa el archivo index que tendra las rutas a utilizar*/
const rutas_index = require('./Direcciones/index');

/*Se utilizan las rutas importadas del archivo*/
servidor.use('/',rutas_index);

/*Conecta a la base de datos*/
mongoose.connect('mongodb+srv://test:T1eNIRRSQY4NQ5aO@testing-bc2mb.mongodb.net/phonebook')
  .then(db => console.log('Base de datos conectada'))				//Promesa que indica la conexion a la BD
  .catch(err => console.log(err));




