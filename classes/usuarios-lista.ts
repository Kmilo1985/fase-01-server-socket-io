import { Usuario } from "./usuario";
export class UsariosLista {
  private lista: Usuario[] = [];
  constructor() {}


  //Agreso un suario a la lista de usuarios activos
  public agregar(usuario: Usuario) {
    this.lista.push(usuario);
    console.log(this.lista, 'Desde lista  ts');
    return usuario;
    
  }

  //Se acualiza el nombre del usuario
  public actualizarNombre(id:string, nombre:string) {

    for(let usuario of this.lista){
        if (usuario.id === id) {
            usuario.nombre = nombre;
            break;
        }
    }

    console.log('Actulaizando usuario');
    console.log(this.lista);
    
  }

  public obtenerListaUsuario(){
      return this.lista;
  }

  public getUsuario(id:string){

    return this.lista.find(usuario=>{
        return usuario.id === id;
    })
  }

  public obtebeerUsuarioEnSala(sala:string){
      return this.lista.filter(usuario=>usuario.sala == sala );
  }

  public borrarUusario(id:string){

    const temUser  = this.getUsuario(id);

    this.lista = this.lista.filter(usuario=>usuario.id !== id);
    console.log(this.lista);
    

  }
}
