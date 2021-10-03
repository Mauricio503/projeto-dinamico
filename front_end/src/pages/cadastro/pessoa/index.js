import { Component } from "react";
import api from "../../../services/api";
import headerRequisicoes from "../../../utils/headerRequisicoes";
import TableInput from "../../../components/tableInput";
import {
    Container, Header,
  } from "semantic-ui-react";
import { Col, Row } from "react-bootstrap";
import Cheackbox from "../../../components/checkbox";
import InputMask from "../../../components/inputMask";
import apiConsultaCNPJ from "../../../services/apiConsultaCnpj";
import Button from "../../../components/button";
import ReplaceAll from "replaceall";
import ButtonCheack from "../../../components/buttonCheack";

export default class Pessoa extends Component {
  constructor(props) {
    super(props);
    this.state = {endereco: {
        enderecoDefault:[{type:"input"},{type:"input"},{type:"input"},{type:"input"},{type:"select"},{type:"select"}],
        columns:[{name:"Endereço",size:3},{name:"Numero",size:1},{name:"Bairro",size:1},{name:"Cep",size:1},{name:"Cidade",size:2},{name:"Estado",size:2}]},
        pessoa:{tipo:"fisico",cpfCnpj:"",
          categoria:[
            {descricao:"cliente",select:false},{descricao:"fornecedor",select:false},{descricao:"transportadora",select:false},
            {descricao:"representaten",select:false},{descricao:"funcionario",select:false}
          ],
          //tornar padrão adicionar type,name e value
          endereco:[{colunas:[
            {name:"endereco",endereco: "",type:"input"},{name:"numero",numero: "",type:"input"},{name:"bairro",bairro: "",type:"input"},{name:"cep",cep: "",type:"input"},
            {name:"cidade",cidade: "",type:"select"},{name:"estado",estado: "",type:"select"}
          ]}]},
        selectCpfCnpj:true
    };
  }

  alteracaoEndereco = (i,input,value) => {
    this.setState(state => {
      const list = state.pessoa.endereco.map((item, j) => {
        if (j === i) {
          console.log(item);
          if(item.endereco === "" && item.numero === ""){
            console.log("erntrou");
          }
          if(item.endereco === "" && item.numero === "" && item.bairro === "" && item.cep === "" && item.cidade === "" && item.estado === ""){
            this.state.pessoa.endereco.push({endereco: "",type:"input"},{numero: "",type:"input"},{bairro: "",type:"input"},{cep: "",type:"input"},
              {cidade: "",type:"select"},{estado: "",type:"select"});
          }
          console.log(item.colunas.find(col => col));
          item.colunas.map(c => {
            if(c.endereco !== undefined){
              c[input] = value;
            }
          });
          return item;
        } else {
          return item;
        }
      });
      return {
        list,
      };
    });

  }

  alteracao = async(event) =>{
    this.setState({[event.target.name]:event.target.value});
  }

  alteracaoPessoa = async(event) =>{
    this.setState(state => {
      state.pessoa[event.target.name] = event.target.value;
    });
  }

  alteracaoCheakBox = async(event) =>{
    this.setState({[event.target.name]:!this.state.selectCpfCnpj});
    this.setState(state => state.pessoa.tipo=this.state.selectCpfCnpj === false ?"fisico":"juridico");
  }

  alteracaoTipoPapel = async(value) =>{
      this.setState(state => state.pessoa.categoria.map(item => {
        if(item.descricao === value){
          item.select = !item.select;
          return item;
        }else{
          return item;
        }
      }));
  }


  buscaCNPJ = async(link,data,key) => {
    const replaceCnpj = (cpfCnpj,cb) => {
        let cnpj = ReplaceAll(".","",cpfCnpj);
        cnpj = cnpj.replace("/","").replace("-","");
        cb(cnpj);
    };
    if(this.state.pessoa.tipo === "juridico"){
      function cb(value){
        api.post("/pessoa/buscaCNPJReceita",{cnpj:value}, headerRequisicoes).then(r => {
          console.log(r.data);
        })
      }
      replaceCnpj(this.state.pessoa.cpfCnpj,cb);
    }
  }

  genericRequest = async(link,data,key) => {
      api.post(link,data,headerRequisicoes).then(r => {
          this.setState({key:r.data});
      })
  }
  
  render() {
    
    return (
        <Container className="pagina">
          <Row>
            <Col sm={1}>
              <Cheackbox title="CPF" onChange={this.alteracaoCheakBox} checked={this.state.selectCpfCnpj} name="selectCpfCnpj"/>
            </Col>
            <Col sm={1}>
              <Cheackbox title="CNPJ" onChange={this.alteracaoCheakBox} checked={!this.state.selectCpfCnpj} name="selectCpfCnpj"/>
            </Col>
            <Col sm={3}>
              {this.state.selectCpfCnpj === true ?
                <InputMask mask="cpf" onChange={this.alteracaoPessoa} name="cpfCnpj"/>
              :
                <InputMask mask="cnpj" onChange={this.alteracaoPessoa} name="cpfCnpj"/>
              }
            </Col>
            <Col sm={3}>
              <Button label="Buscar" onClick={this.buscaCNPJ}/>
            </Col>
            <Col sm={12}>
              <Header as="h4" dividing>Tipo de Papel</Header>
              <Col sm={12}>
              <Row>
                  <ButtonCheack label="Cliente" onClick={() => this.alteracaoTipoPapel("cliente")} select={this.state.pessoa.categoria[0].select}/>
                  <ButtonCheack label="Fornecedor" onClick={() => this.alteracaoTipoPapel("fornecedor")} select={this.state.pessoa.categoria[1].select}/>
                  <ButtonCheack label="Transportadora" onClick={() => this.alteracaoTipoPapel("representante")} select={this.state.pessoa.categoria[2].select}/>
                  <ButtonCheack label="Representante" onClick={() => this.alteracaoTipoPapel("representante")} select={this.state.pessoa.categoria[3].select}/>
                  <ButtonCheack label="Funcionário"  onClick={() => this.alteracaoTipoPapel("funcionario")} select={this.state.pessoa.categoria[4].select}/>
              </Row>
              </Col>
            </Col>
          </Row>
            <Header as="h4" dividing>Endereço</Header>
            <TableInput columns={this.state.endereco.columns} columnsDefault={this.state.endereco.enderecoDefault} onChange={this.alteracaoEndereco}
              list={this.state.pessoa.endereco}/>

            <Col sm={12}>
            <Button label="Buscar" onClick={this.buscaCNPJ}/>
              </Col>
        </Container>
    );
  }
}
