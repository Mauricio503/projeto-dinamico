import React, { Component } from "react";
import { Menu } from "semantic-ui-react";

export default class MenuContent extends Component {
  constructor(props) {
    super(props);
    this.state = { menus: [{url:"/ent",menu:"Entidade"}] };
  }

  render() {
    return (
      <div style={{padding:"50px"}}>
        <Menu fluid vertical fixed="left">
          {this.state.menus.map((e, i) =>
            e.componenteMenu === true ? (
              <Menu.Item
                key={i}
                href={e.url}
                name={e.menu}
                content={e.menu}
              ></Menu.Item>
            ) : (
              ""
            )
          )}
        </Menu>
      </div>
    );
  }
}