import React, { Component } from "react";
import io from "socket.io-client";
import ChatUser from "./ChatUser";

const socket = io("http://localhost:3000");

class ChatUsuarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mensajesConversacion: []
    };
  }

  // Envío nuevo mensaje a la API y guardo el valor en el estado
  enviarMensaje = (mensaje, id) => {
    socket.emit("enviarMensaje", mensaje, id);
    var msjSaliente = [mensaje, id];
    this.setState({
      mensajesConversacion: [...this.state.mensajesConversacion, msjSaliente]
    });
  };

  recibirMensaje = (mensaje, id) => {
    var msjEntrante = [mensaje, id];
    this.setState({
      mensajesConversacion: [...this.state.mensajesConversacion, msjEntrante]
    });
  };

  render() {
    const mensajesChat = this.state.mensajesConversacion.map(msj => {
      var idMsj = msj[1] + "Msj";
      var mensaje = msj[0];
      return { idMsj, mensaje };
    });

    return (
      <ChatUser
        mensajesConversacion={mensajesChat}
        enviarMensaje={this.enviarMensaje}
        recibirMensaje={this.recibirMensaje}
        id={this.props.id}
      />
    );
  }
}

export default ChatUsuarios;
