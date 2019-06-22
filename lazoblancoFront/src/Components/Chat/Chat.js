import React, { Component } from "react";
import io from "socket.io-client";
import ChatBot from "./Chatbot";
import ChatUsuarios from "./ChatUsuarios";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "user",
      activo: "Blanca"
    };
  }

  handleOnClick = e => {
    var value = e.target.getAttribute("value");
    if (value === "setProfesional") {
      this.setState({ id: "profesional" });
    } else {
      this.setState({ activo: value });
    }
  };

  render() {
    return (
      <div id="frame">
        <div id="sidepanel">
          <div id="profile" className="d-none d-md-block ">
            <div className="wrap">
              <h5 onClick={this.handleOnClick} value="setProfesional">
                Lazo Blanco
              </h5>
            </div>
          </div>

          <div id="contacts">
            <ul>
              <li
                className="contact"
                value={this.props.dataUsuarios[0].nombre}
                onClick={this.handleOnClick}
              >
                <div className="wrap">
                  <span className="contact-status" />
                  <img src={this.props.dataUsuarios[0].imgUrl} alt="" />
                  <div className="meta">
                    <p className="name">
                      {this.props.dataUsuarios[0].nombre}
                    </p>
                  </div>
                </div>
              </li>
              <li
                className="contact"
                value={this.props.dataUsuarios[1].nombre}
                onClick={this.handleOnClick}
              >
                <div className="wrap">
                  <span className="contact-status" />
                  <img src={this.props.dataUsuarios[1].imgUrl} alt="" />
                  <div className="meta">
                    <p className="name">
                      {this.props.dataUsuarios[1].nombre}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="content">
          <div className="contact-profile">
            {this.state.activo === "Blanca" ? (
              <>
                <img src={this.props.dataUsuarios[0].imgUrl} alt="" />
                <p>{this.props.dataUsuarios[0].nombre}</p>
              </>
            ) : (
              <>
                <img src={this.props.dataUsuarios[1].imgUrl} alt="" />
                <p>{this.props.dataUsuarios[1].nombre}</p>
              </>
            )}
          </div>
          {this.state.activo === "Blanca" ? (
            <ChatBot />
          ) : (
            <ChatUsuarios id={this.state.id} />
          )}
        </div>
      </div>
    );
  }
}

export default Chat;
