import React, { Component } from "react";
import { ApiAiClient } from "api-ai-javascript";
import Chat from "./tempChat";

const client = new ApiAiClient({
  accessToken: "63a4854028e84281987b7c9c71c1d409"
});

class ChatBot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mensajesConversacion: []
    };
  }

  // Envío nuevo mensaje a la API y guardo el valor en el estado
  enviarMensaje = (mensaje, id) => {
    // Agrego mensajes al array de Conversación
    var msjSaliente = [mensaje, id];
    this.setState({
      mensajesConversacion: [...this.state.mensajesConversacion, msjSaliente]
    });

    client
      .textRequest(mensaje)
      .then(respuesta => {
        var idBot = "bot";
        var msj = respuesta.result.fulfillment.speech;
        // console.log(respuesta)
        var msjEntrante = [msj, idBot];
        this.setState({
          mensajesConversacion: [
            ...this.state.mensajesConversacion,
            msjEntrante
          ]
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleEnviar = (msj, id) => {
    this.enviarMensaje(msj, id);
  };

  render() {
    const mensajesChat = this.state.mensajesConversacion.map(msj => {
      var idMsj = msj[1] + "Msj";
      var mensaje = msj[0];
      return { idMsj, mensaje };
    });
    //
    // ));

    return (
      <Chat
        mensajesConversacion={mensajesChat}
        handleEnviar={this.handleEnviar}
      />
    );
  }
}

export default ChatBot;
