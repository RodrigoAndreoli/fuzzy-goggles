import React, { Component } from "react";
import Manager from "./Components/Chat/Chat";
import Menu from "./Components/Menu";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }
  dataUsuarios = [
    {
      nombre: "Blanca",
      imgUrl: "https://core3.imgix.net/59afd70fd1abalogo1250x250.png",
      status: "online"
    },
    {
      nombre: "Profesional",
      imgUrl:
        "https://www.clarifybd.com/wp-content/uploads/2016/03/client-icon-blue.png",
      status: "online"
    }
  ];
  render() {
    return (
      <>
        {/* <Menu handlePantalla={this.handlePantalla} /> */}
        <Manager dataUsuarios={this.dataUsuarios} />
      </>
    );
  }
}

export default App;
