import { Socket } from "socket.io";
import socketIO from "socket.io";
import { Usuario } from '../classes/usuario';
import { UsariosLista } from '../classes/usuarios-lista';

export const usuariosConectados = new UsariosLista(); 

export const conectarCliente = (cliente: Socket)=>{
  const usuario = new Usuario(cliente.id);
  usuariosConectados.agregar(usuario);
}

// export const

export const desconectar = (cliente: Socket) => {
  cliente.on("disconnect", () => {
    // console.log("Cliente desconectado");
    usuariosConectados.borrarUusario(cliente.id);
  });
};

// ESCUCHAR MENSAJES
export const mensaje = (cliente: Socket, io: socketIO.Server) => {
  cliente.on(
    "mensaje",
    (payload: { de: string; cuerpo: string }) => {
      // console.log("mensaje recibido", payload);
      io.emit("mensaje-nuevo", payload);
    }
  );
};

// Configurar Usuario
export const configurarUsuario = (cliente: Socket, io: socketIO.Server) => {
  cliente.on("configurar-usuario", (payload: { nombre: string }, callback: Function) => {
    // console.log("configurar-usuario", payload.nombre);
    usuariosConectados.actualizarNombre(cliente.id,payload.nombre)
    callback({
      ok:true,
      mensaje:'Usuario  '+ payload.nombre + '  configurado'
    })
  });
};
