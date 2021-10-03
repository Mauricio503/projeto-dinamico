import React, { Component } from "react";
import { Menu,  Icon } from "semantic-ui-react";
import HamburgerMenu from "react-hamburger-menu";
import ScrollMenu from 'react-horizontal-scrolling-menu';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';


export default class menu extends Component {
  constructor(props) {
    super(props);
    this.state = { menus: [], menuOpen: false, pessoa: {}, login: "",selected: "Pessoa", menuItem:[ ], menuItemSelect:[ ]};
  }

  Menu = (list,indice) => {
    const options = [
      'Adicionar Na Tela Principal'
    ];
    if(indice !== null){
      if(this.state.menuItemSelect.length === 0){
        this.state.menuItemSelect.push({ind:indice,isSelect:true});
      }else{
          this.setState(state => {
            const menuItemSelect = state.menuItemSelect.map((item, j) => {
              if(item.ind === indice){
                item.isSelect = !item.isSelect;
                return item;
              }else{
                item.ind = indice;
                item.isSelect = true;
                return item
              }
            });
            return {
              menuItemSelect,
            };
          });
      }
    }
    const MenuItem = ({ text, ind,url }) => {
      return (
        <div
          className="menu-item"
          style={{borderRight:"solid 1px #eee"}}
        >
          <a href={url} style={{textDecoration:"none",color:"#000"}}>{text}</a>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={() => this.Menu(this.props.menus.find(e => e.cadastro !== undefined).cadastro,this.props.menus.find(e => e.cadastro !== undefined).cadastro.findIndex(ind => ind.menu === text))}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            hidden={!(this.state.menuItemSelect.find(m => m.ind === ind) !== undefined ? this.state.menuItemSelect.find(m => m.ind === ind).isSelect : false)}
            PaperProps={{
              style: {
                maxHeight: 48 * 4.5,
                width: '20ch',
              },
            }}
      >
        {options.map((option) => (
            <Menu.Item key={option}>
              {option}
            </Menu.Item>
        ))}
      </Menu>
        </div>
      );
    };
    let listaMenuItem = [];
    list.forEach(el => {
      const { menu,componenteMenu,url } = el;
      if(componenteMenu === true){
        listaMenuItem.push(<MenuItem 
          ind={indice}
          text={menu}
          key={menu}
          url={url}
        />);
      }
    });
    this.setState({menuItem:listaMenuItem});
  }

  onSelect = key => {
    this.setState({ selected: key });
  }


  Arrow = ({ text, className }) => {
    return (
      <div
        className={className}
      >{text}</div>
    );
  };

  ArrowLeft = this.Arrow({ text: '<', className: 'arrow-prev' });
  ArrowRight = this.Arrow({ text: '>', className: 'arrow-next' });

  menu() {
    this.setState({ menuOpen: this.state.menuOpen === false ? true : false });
  }

  sair = async () => {
    var localStorage = window.localStorage;
    localStorage.setItem("token_erp", undefined);
    window.location.href = "/";
  };

  alteraTema = async (event) => {
    var localStorage = window.localStorage;
    localStorage.setItem("tema_erp", event.target.value);
    window.location.href = "/";
  };
  // handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { selected } = this.state;
    return (
     <>
     <div className="menuUsuario">
          <Menu floated="right">
            <Menu.Item name="nome">
              Tema
              <select onChange={this.alteraTema}>
                <option value=""></option>
                <option value="padrao">Padrão</option>
                <option value="flamengo">Flamengo</option>
              </select>
            </Menu.Item>
            <Menu.Item name="nome">
              Maurício Spagnol
            </Menu.Item>
            <Menu.Item name="pagina_inicial" onClick={this.sair}>
              <Icon name="home" />
            </Menu.Item>
            <Menu.Item name="Sair" onClick={this.sair}>
              <Icon name="sign-out" color="red" />
            </Menu.Item>
          </Menu>
        </div>
      <Menu compact icon='labeled' style={{border:"0"}} size="huge">
       <Menu.Item>
        <HamburgerMenu 
              isOpen={this.state.menuOpen}
              menuClicked={this.menu.bind(this)}
              width={50}
              height={30}
              strokeWidth={2}
              rotate={0}
              color="#0a83cd"
              borderRadius={4}
              animationDuration={0.5}
            />
          </Menu.Item>
        {this.state.menuOpen && 
        <>
        <Menu.Item
          name='briefcase'
          active={false}
          onClick={() => this.Menu(this.props.menus.find(e => e.cadastro !== undefined).cadastro,null)}
        >
          <Icon name='briefcase'/>
          Cadastro
        </Menu.Item>
        </>
        }
             </Menu>
             <ScrollMenu
             itemClassActive="true"
             data={this.state.menuItem}
             arrowLeft={this.ArrowLeft}
             arrowRight={this.ArrowRight}
           />
           </>
    );
  }
}