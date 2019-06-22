import React, { Component } from "react";
import "../../Assets/css/Chatbot/chatbot.css";
import io from "socket.io-client";

class ChatUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputMsj: ""
    };
    this.chatRef = React.createRef();

    if (this.props.id === "profesional") {
      const socket = io("http://localhost:3000");
      socket.on("recibirMensaje", (msj, id) => {
        if (id !== "profesional") {
          props.recibirMensaje(msj, id);
        }
      });
    } else {
      const socket = io("http://localhost:3000");
      socket.on("recibirMensaje", (msj, id) => {
        if (id !== "user") {
          props.recibirMensaje(msj, id);
        }
      });
    }
  }

  handleEnviar = () => {
    var id = this.props.id;
    var msj = this.state.inputMsj;
    this.props.enviarMensaje(msj, id);
    this.setState({ inputMsj: "" });
  };

  handleOnChange = e => {
    this.setState({
      inputMsj: e.target.value
    });
  };

  _handleTeclaPresionada = e => {
    if (e.key === "Enter") {
      this.handleEnviar();
    }
  };

  componentDidUpdate = () => {
    this.chatRef.current.scrollTop = this.chatRef.current.scrollHeight;
  };

  render() {
    var Chat = this.props.mensajesConversacion.map(msj => {
      var idMsj = msj.idMsj;
      var mensaje = msj.mensaje;
      return (
        <li className={idMsj} key={mensaje}>
          <img
            src="https://core3.imgix.net/59afd70fd1abalogo1250x250.png"
            alt=""
          />
          <p>{mensaje}</p>
        </li>
      );
    });

    // var ultimoMensaje = this.props.mensajesConversacion
    //   .map(msj => {
    //     return msj.mensaje;
    //   })
    //   .slice(-1);
    return (
      <>
        <div className="messages" ref={this.chatRef}>
          <ul>{Chat}</ul>
        </div>
        <div className="message-input">
          <div className="wrap">
            <input
              type="text"
              placeholder="Escribe tu mensaje..."
              value={this.state.inputMsj}
              onChange={this.handleOnChange}
              onKeyPress={this._handleTeclaPresionada}
            />
            <button className="submit" onClick={this.handleEnviar}>
              <i className="fa fa-paper-plane" aria-hidden="true" />
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default ChatUser;
