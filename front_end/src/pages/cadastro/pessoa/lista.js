import { Component } from "react";
import Lista from "../../../components/paginaLista";
import api from "../../../services/api";
import headerRequisicoes from "../../../utils/headerRequisicoes";

export default class PessoaLista extends Component {
  constructor(props) {
    super(props);
    this.state = {list:[]};
    this.genericRequest("/pessoa/lista",{},"list");
  }

  genericRequest = async(link,data,key) => {
    api.post(link,data,headerRequisicoes).then(r => {
        this.setState({key:r.data});
    })
  }
  
  render() {
    return (
        <Lista title="Pessoa" link="/pessoa" />
    );
  }
}
