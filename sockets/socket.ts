import { Socket } from "socket.io";
import socketIO from "socket.io";
import { UsuariosLista } from "../classes/usuarios-lista";
import { Usuario } from "../classes/usuario";


export const usuariosConectados = new UsuariosLista();

export const conectarCliente = ( cliente: Socket, io: socketIO.Server) => {
    const usuario = new Usuario( cliente.id);
    usuariosConectados.agregar( usuario );


} 

export const desconectar = ( cliente: Socket, io: socketIO.Server) => {

    cliente.on('disconnect', () => {
        console.log('Cliente desconectado ');
        //borrar usuario de lista
        const usuario = new Usuario( cliente.id);
        usuariosConectados.borrarUsuario( usuario.id );

        io.emit('usuarios-activos', usuariosConectados.getLista());
    });

}

//escuchar mensaje
export const mensaje = ( cliente: Socket , io : socketIO.Server) => {

    cliente.on('mensaje', ( payload: {de: string, cuerpo: string }) => {
        console.log('Mensaje recibido ', payload);

        io.emit('mensaje-nuevo', payload);

    });

}

//mensaje configurar usuario
export const configurarUsuario = ( cliente: Socket , io : socketIO.Server) => {

    cliente.on('configurar-usuario', ( payload: {nombre: string }, callback: any) => {
        //console.log('Mensaje configurando usuario ', payload.nombre );

        //io.emit('mensaje-nuevo', payload);
        //respuest en angular

        //agrega nombre de usuario a lista
        usuariosConectados.actualizarNombre( cliente.id, payload.nombre );

        io.emit('usuarios-activos', usuariosConectados.getLista());

        callback({
            ok: true,
            mensaje: `Usuario ${ payload.nombre }, configurado`
        });
    });

}


//obtener usuarios
//mensaje configurar usuario
export const obtenerUsuarios = ( cliente: Socket , io : socketIO.Server) => {

    cliente.on('obtener-usuarios', ( ) => {
 
        io.to( cliente.id ).emit('usuarios-activos', usuariosConectados.getLista());

    });

}
