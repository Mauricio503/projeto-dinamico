import React, { Component } from "react";
import {
  Grid,
  Header,
  Form,
  Button,
  FormField,
  Message,
  Segment,
  Input,
  Divider,
} from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { Row, Col } from "react-bootstrap";
import get from "lodash/get";
import { Formik } from "formik";
import * as Yup from "yup";
import api from "../services/api";
import axios from "axios";

const defaultFormShape = {
  senha: "",
  login: "",
};

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openCadastrarUsuario: false,
      selectedOption: "",
      cpf_cnpj: "",
      cadastroNotFound: false,
      listaCadastros: [],
      listaCadastrosView:[],
      listaEntidadesView:[],
      clube_opcao_cadastrar: "",
      nome_cadastro: "",
      login_cadastro: "",
      loginInvalido: false,
      problemaCadastro: false,
      sucessoCadastro: false,
      clicouCadastrar: false,
      tipoUsuarioInvalido: false,
      emailNaoCadastrado: false,
      habilitar_codigo_seguranca: false,
      codigo_seguranca:null,
      email:null,
      codigo_seguranca_invalido:false
    }
  }

  submit = async(values) => {
    await axios.get("https://api.ipify.org/?format=json").then(async(ip) => {
      values.ip = ip.data.ip;
      if(values.codigo_seguranca !== undefined){
        this.validarCodigo(values);
      }else{
        this.efetuarLogin(values);
      }
    });
  }

  efetuarLogin = async (values) => {
      await api.post("/usuario/autenticacao", {
        login: values.login,
        senha: values.senha,
        ip: values.ip
      }).then(resposta => {
        if(resposta.data.error === "Ip Inválido"){
          this.setState({habilitar_codigo_seguranca:true,email:resposta.data.usuario.email});
        }else{
          var localStorage = window.localStorage;
          localStorage.setItem("token_erp", resposta.data.token);
          window.location.reload();
        }
      }).catch(async(e) => {
        this.setState({ loginInvalido: true });
      });
  };

  validarCodigo = async(values) => {
      await api.post("/autenticacao/validacaoCodigoSeguranca", {
        login: values.login,
        senha: values.senha,
        ip:values.ip,
        codigo_validacao:values.codigo_seguranca
      }).then(resposta => {
        var localStorage = window.localStorage;
        localStorage.setItem("token_erp", resposta.data.token);
        window.location.reload();
      }).catch(async(e) => {
        if(e.response.data.error === "Código de Validação Inválido"){
          this.setState({codigo_seguranca_invalido:true});
        }else{
          this.setState({ loginInvalido: true });
        }
    });
  }


  render() {
    const validationSchema = Yup.object().shape({
      login: Yup.string().required("Login é requerido!"),
      senha: Yup.string().required("Por favor digite a senha"),
      codigo_seguranca: Yup.string(),
    });
    return (
      <Formik
        initialValues={defaultFormShape}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values) => {
          this.submit(values);
        }}
        render={({
          touched,
          errors,
          values,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
            <Grid
              textAlign="center"
              style={{ height: "100vh" }}
              verticalAlign="middle"
              container
            >
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h1" color="blue" textAlign="center"></Header>
                <Form
                  onSubmit={handleSubmit}
                  loading={this.props.loading}
                  size="large"
                >
                  <Segment raised>
                    <FormField>
                      <Input
                        placeholder="Login"
                        icon="user"
                        iconPosition="left"
                        fluid
                        name="login"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        values={values.email}
                      />
                      {get(touched, "login") && get(errors, "login") && (
                        <Message negative size="mini">
                          {errors.login}
                        </Message>
                      )}
                    </FormField>
                    <FormField>
                      <Input
                        placeholder="Senha"
                        icon="lock"
                        iconPosition="left"
                        fluid
                        type="password"
                        name="senha"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        values={values.senha}
                      />
                      {get(touched, "senha") && get(errors, "senha") && (
                        <Message negative size="mini">
                          {errors.senha}
                        </Message>
                      )}
                    </FormField>
                    {this.state.loginInvalido === true &&
                      <Message negative size="mini">
                        Login Inválido!
                      </Message>
                    }
                    <Button fluid primary type="submit" size="large" disabled={this.state.habilitar_codigo_seguranca}>
                      Login
                    </Button>

                    {this.state.habilitar_codigo_seguranca &&
                      <>
                      Favor Confirmar Código enviado para o E-mail {this.state.email}
                      <Row>
                      <Col sm={8}>
                        <Input
                          placeholder="Código Segurança"
                          iconPosition="left"
                          fluid
                          type="number"
                          name="codigo_seguranca"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          values={values.codigo_seguranca}
                        />
                        {this.state.codigo_seguranca_invalido &&
                          <Message negative size="mini">
                            Código de Segurança Inválido
                          </Message>
                        }
                        </Col>
                        <Col sm={4}>
                          <Button fluid primary type="submit" size="large" onClick={(values) => {this.validarCodigo(values);}}>
                            Enviar
                          </Button>
                        </Col>
                      </Row>
                    </>
                    }

                    <FormField style={{marginTop:"10px"}}>
                      <Link to={{ pathname: "/esqueceuSenha" }}>
                        Esqueceu a senha?
                      </Link>
                    </FormField>

                    <Divider/>
                  </Segment>
                </Form>
              </Grid.Column>
            </Grid>
          )}
      />
    );
  }
}

export default Login;