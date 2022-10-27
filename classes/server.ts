import express from 'express'; //npm install @types/express --save-dev
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/socket';

export default class Server {
    private static _intance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;

    constructor(){
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server( this.app );
        //this.io = socketIO( this.httpServer);    ->error TS2349: This expression is not callable. ->this.io = socketIO( this.httpServer);
        //this.io = new socketIO.Server(this.httpServer);
		this.io = new socketIO.Server(this.httpServer, {
			cors: {
				origin: true,
				credentials: true
			}
		});
        
        this.escucharSockets();
    }

    public static get instance(){
        return this._intance || ( this._intance = new this() );
    }

    private escucharSockets(){
        console.log('Escuchando conexiones - sockets ');
        this.io.on('connection', cliente => {
            //console.log('Cliente conectado ');

            console.log(cliente.id);

            //conectar cliente
            socket.conectarCliente( cliente, this.io);

            //configurando usuario
            socket.configurarUsuario( cliente , this.io );

            //mensajes
            socket.mensaje( cliente , this.io );

            //desconectar
            socket.desconectar( cliente , this.io);

            //obtener usuarios activos
            socket.obtenerUsuarios( cliente , this.io);
        });

    }

    start( callback: Function ){
        this.httpServer.listen( this.port, callback() );
        

    }
}