import Server from './classes/server';
import router from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors'; //npm i @types/cors --save-dev 

const server = Server.instance;

// BodyParser
server.app.use( bodyParser.urlencoded({ extended: true}));
server.app.use( bodyParser.json());

//cors
server.app.use( cors({ origin: true, credentials: true}));

//rutas servicios
server.app.use('/', router);

server.start( ()=> {
    console.log(`Servidor corriendo en el puerto ${ server.port }`)
}); 
