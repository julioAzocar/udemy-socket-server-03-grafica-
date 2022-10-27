import { Usuario } from "./usuario";

export class UsuariosLista{

    private lista: Usuario[] = [];

    constructor(){

    }

    //agregar un usuario
    public agregar(usuario : Usuario){
        this.lista.push(usuario);
        console.log( this.lista);
        return usuario;
    }
    
    public actualizarNombre(id: string, nombre: string ){
        for(let usuario of this.lista){
            if ( usuario.id === id){
                usuario.nombre = nombre;
                break;
            }
        }

        console.log( '==== actualizando usuario ===');
        console.log( this.lista);
    }

    //obtener lista de usuarios
    public getLista(){
        return this.lista.filter( usuario => usuario.nombre !== 'sin-nombre' );
    }

    //obtener usuario
    public getUsuario(id: string ){
        this.lista.find(usuario => {
            return usuario.id === id
        });
    }

    //todos los usuarios de una sala
    public getUsuariosEnSala(sala : string){
        return this.lista.filter(usuario => {
            return usuario.sala === sala
        });
    }

    //eliminar usuario de lista
    public borrarUsuario(id: string){
        const tempUsuario = this.getUsuario( id );

        this.lista = this.lista.filter(usuario => {
            return usuario.id !== id
        });

        //console.log(this.lista);

        return tempUsuario;
    }

}