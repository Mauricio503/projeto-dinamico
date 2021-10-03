import React, { Component } from "react";
import ProtectedRoute from "./services/protectRoute";
import api from "./services/api";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Menu from "./pages/menu/index";
import UML from "./pages/uml";
import Pessoa from "./pages/cadastro/pessoa/index";
import PessoaLista from "./pages/cadastro/pessoa/lista";

export default class Rotas extends Component {
  constructor(props) {
    super(props);
    this.state = { menus: [] };
    this.menus();
  }

  menus = async () => {
    await api.post("/menu/lista", {
    },{headers:{token:"Baer "+window.localStorage.getItem("token_erp")}}).then(resposta => {
     this.setState({menus:resposta.data});
    });
  };

  render() {
    var token = localStorage.getItem("token_erp");
    
    return (
      <BrowserRouter>
        {
          token !== null && token.length > 10 && <Menu menus={this.state.menus}/>
        }         
          <Switch>
            <Route
              exact
              path="/"
              component={token == null || token.length < 10 ? Login : null}
            />
          <ProtectedRoute
              path="/uml"
              component={UML}
              menus={this.state.menus}
            />
          <ProtectedRoute
              path="/pessoa/lista"
              component={PessoaLista}
              menus={(this.state.menus.length > 0 ? this.state.menus.find(e => e.cadastro !== undefined).cadastro : [])}
            />
          <ProtectedRoute
              path="/pessoa"
              component={Pessoa}
              menus={(this.state.menus.length > 0 ? this.state.menus.find(e => e.cadastro !== undefined).cadastro : [])}
            />
           
          </Switch>
      </BrowserRouter>
    );
  }
}
