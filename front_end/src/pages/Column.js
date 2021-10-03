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
        
        
        export default class Column extends Component {
          constructor(props) {
            super(props);
            this.state = {
            };
          }   
                  
          render() {
            return (
              <Col sm={12}>
                <Header as="h1" dividing>
                Column
                </Header>
                      <Col sm={8}>
                        <Input transparent placeholder='Nome Tabela' />
                      </Col>
            );
          }
        }