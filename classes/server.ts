import express from "express";
import { SERVER_PORT } from "../global/environment";
import socketIO from "socket.io";
import http from "http";
import * as socket from "../sockets/socket";

export default class Server {
  private static _intance: Server;
  public app: express.Application;
  public port: number;
  public io: socketIO.Server;
  private httpServer: http.Server;

  private constructor() {
    this.app = express();
    this.port = SERVER_PORT;
    this.httpServer = new http.Server(this.app);
    //  PARA UTILIZAR EXPRESS CON SOCKET IO SEGUIR IMPLEMENTACIÓN
    this.io = socketIO(this.httpServer); //integro de socket io
    this.escucharSockets();
  }

  /**
   *@description Secrea el patron singleton instanciando la clase constructor
   * y asi derivando  la clase padre en la funcion get instance y generando una unica instancia
   * @readonly
   * @static
   * @memberof Server
   */
  public static get instance() {
    return this._intance || (this._intance = new this());
  }

  private escucharSockets() {
    console.log("escuchando sockets");
  }
  start(callback: any) {
    this.httpServer.listen(this.port, callback);
    this.io.on("connection", (cliente) => {
      console.log(cliente.id);

      // MENSAJE
      socket.mensaje(cliente,this.io);

      //   Desconectar
      socket.desconectar(cliente);


      // conectar cliente
      socket.conectarCliente(cliente)

      //CONFIGURAR USUARIO
      socket.configurarUsuario(cliente,this.io)
    });
  }
}
