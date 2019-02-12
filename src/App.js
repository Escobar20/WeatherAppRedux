import React, { Component } from "react";
import Container from "./components/container";
//---STORE
import StoreRef from "./store/store";
//The provider gives us acces to the state
import { Provider } from "react-redux";

//----------------------------------------------------
import { BrowserRouter } from "react-router-dom";
//----------------------------------------------------

class App extends Component {
  render() {
    return (
      <Provider store={StoreRef}>
        <BrowserRouter basename="/">
          <div className="container">
            <Container />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
