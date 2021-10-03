import React, { Component } from "react";
import { Row, Col, Form } from "react-bootstrap";
import {
  Header,
  Button,
  Divider,
  Input,
  Checkbox,
  Select
} from "semantic-ui-react";
import Draggable from 'react-draggable';
import TypeColumnList from "../enum/typeColumnTable";
import api from "../services/api";
import HeaderR from "../utils/headerRequisicoes";

export default class UML extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }
 
  onAddItem = () => {
    this.setState(state => {
      const list = [...state.list];
      list.push({diminuir_tabela:false,nome_tabela:null,modulo:null,posicao_x:0,posicao_y:0,colunas:[
        {nome:"id",tipo:"",tamanho:null,escala:null, pk:false, nn:false,
        tabela_ligacao:null}
      ]});
      return {
        list
      };
    });
  };

  onAddColumn = i => {
    this.setState(state => {
      const list = state.list.map((item, j) => {
        if (j === i) {
          item.colunas.push({nome:"",tipo:"",tamanho:null,escala:null, pk:false, nn:false,
          tabela_ligacao:null});
          return item;
        } else {
          return item;
        }
      });
      return {
        list,
      };
    });
  };

  onUpdateList = (i,input,value) => {
    this.setState(state => {
      const list = state.list.map((item, j) => {
        if (j === i) {
          if(input === "diminuir_tabela"){
            item.diminuir_tabela = item.diminuir_tabela === false ? true : false;
          }else{
            item[input] = value;
          }
          return item;
        } else {
          return item;
        }
      });
      return {
        list,
      };
    });
  };

  onUpdateColumn = (i,ic,input,value) => {
    this.setState(state => {
      const list = state.list.map((item, j) => {
        if (j === i) {
          item.colunas.map((it,ic2) => {
            if(ic2 === ic){
              return it[input] = value;
            }else{
              return it;
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
  };

  onRemoveItemColumn = (i,ic) => {
    this.setState(state => {
      const list = state.list.map((item, j) => {
        if (j === i) { 
          item.colunas = item.colunas.filter((col, colI) => colI !== ic)
          return item;
        }else{
          return item;
        }
      });
      return {
        list,
      };
    });
  };

  posicao = (event,ui,i) => {
    this.setState(state => {
      const list = state.list.map((item, j) => {
        if (j === i) {
          item.posicao_x = ui.x;
          item.posicao_y = ui.y;
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

  submit = async() => {
    
    await api.post("/criarEstrutura",{lista:this.state.list},HeaderR);
  }

  render() {
    return (
      <Col sm={12}>
        <Header as="h1" dividing>
          UML
        </Header>
          <Button positive onClick={this.onAddItem}>Nova Tabela</Button>
          <Button primary onClick={this.submit}>Salvar e Atualizar Tabelas</Button>

          {this.state.list.map((item,index) => (
            <Draggable
            key={item}
            handle=".handle"
            defaultPosition={{x: item.posicao_x, y: item.posicao_y}}
            position={null}
            onDrag={(event,ui) => this.posicao(event,ui,index)}
            grid={[25, 25]}
            scale={1}>
            <Col className="handle" sm={item.diminuir_tabela === false ? 5 : 3} style={{border:"1px solid #eeee"}}>
              <Row>
              <Col sm={8}>
                <Input transparent placeholder='Nome Tabela' onChange={(event) => this.onUpdateList(index,"nome_tabela",event.target.value)}/>
              </Col>
              <Col sm={8}>
                <Input transparent placeholder='Modulo' onChange={(event) => this.onUpdateList(index,"modulo",event.target.value)}/>
              </Col>
              <Col sm={4}>
                <Button icon={item.diminuir_tabela === false ? "angle double left" : "angle double right"} onClick={() => this.onUpdateList(index,"diminuir_tabela",null)}
                  style={{float:"right"}}></Button>
              </Col>
              <Divider />
              {item.diminuir_tabela === false &&
                <Col sm={12} style={{float:"right"}}>
                  <Button icon="add" size="tiny" positive  style={{float:"right"}}  onClick={() => this.onAddColumn(index)}></Button>
                </Col>
              }
              {item.colunas.length > 0 && item.colunas.map((col,indCol) => (
                <Row>
                  <Col sm={item.diminuir_tabela === false ? 3 : 6}>
                    <Input placeholder='Coluna' onChange={(event) => this.onUpdateColumn(index,indCol,"nome",event.target.value)}
                      value={col.nome}/>
                  </Col>
                  <Col sm={item.diminuir_tabela === false ? 3 : 6}>
                    <Select placeholder='Tipo de Coluna' options={TypeColumnList} onChange={(event,v) => this.onUpdateColumn(index,indCol,"tipo",v.value)}
                    value={col.tipo}/>
                  </Col> 
                  {col.tipo !== "lt" && col.tipo !== "lg" && item.diminuir_tabela === false ? 
                  <>
                    <Col sm={2}>
                      <Form.Control type="number" name="tamanho" placeholder="Tamanho" onChange={(event) => this.onUpdateColumn(index,indCol,"tamanho",event.target.value)}
                        value={col.tamanho}/>
                    </Col>
                    <Col sm={1}>
                      <Form.Control type="number" name="escala" placeholder="Escala" onChange={(event) => this.onUpdateColumn(index,indCol,"escala",event.target.value)}
                        value={col.escala}/>
                    </Col>
                    <Col sm={1}>
                      PK<br/>
                      <Checkbox onChange={(event) => this.onUpdateColumn(index,indCol,"pk",event.target.value)}
                        value={col.pk === false ? true : false} checked={col.pk}/>
                    </Col>
                    <Col sm={1}>
                      NN<br/>
                      <Checkbox onChange={(event) => this.onUpdateColumn(index,indCol,"nn",event.target.value)}
                        value={col.nn === false ? true : false} checked={col.pk}></Checkbox>
                    </Col>
                   </> 
                  :
                  item.diminuir_tabela === false &&
                    <Col sm={5} style={{paddingLeft:"45px"}}>
                      <Input placeholder='Tabela Ligação' onChange={(event) => this.onUpdateColumn(index,indCol,"tabela_ligacao",event.target.value)}
                        value={col.tabela_ligacao}/>
                    </Col>
                  }
                  {item.diminuir_tabela === false &&
                    <Col sm={1}>
                      <Button negative icon="delete" size="tiny" onClick={() => this.onRemoveItemColumn(index,indCol)}></Button>
                    </Col>
                  }
                </Row>
              ))}
              </Row>
            </Col>
              
          </Draggable>
          ))}
      </Col>
    );
  }
}