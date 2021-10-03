
import React from "react";
import {
  Container,
  Table,
  Button,
  Header,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

const List = ({ title = "",columns = [], list = [],link = "" }) => {
    return (
        <Container className="pagina">
        <Header as="h1" dividing>
          {title}
        </Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
                {columns.map(c => (
                    <Table.HeaderCell>{c.name}</Table.HeaderCell>
                ))}
              <Table.HeaderCell width={1}>
                <Link to={{ pathname: link }}>
                  <Button positive icon="add" size="tiny"></Button>
                </Link>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {list.map((e, i) => (
              <Table.Row key={i}>
                {columns.map(col => (
                    <Table.Cell>{e[col.key] !== null ? e[col.key]:""}</Table.Cell>
                ))}
                <Table.Cell width={1}>
                  <Link to={{ pathname: link, query: { id: e.id } }}>
                    <Button primary icon="edit" size="tiny"></Button>
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>

        {/*<Table.Footer>
            <Table.Row verticalAlign="middle" textAlign="center">
              <Table.HeaderCell colSpan={4}>
                <Menu pagination>
                  <Menu.Item
                    icon
                    onClick={this.voltarPagina}
                    disabled={parseInt(this.state.pagina) === 1}
                  >
                    <Icon name="chevron left" />
                  </Menu.Item>
                  <Menu.Item
                    icon
                    onClick={this.proximaPagina}
                    disabled={
                      parseInt(this.state.pagina) ===
                      parseInt(this.state.totalPaginas)
                    }
                  >
                    <Icon name="chevron right" />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>*/}
        </Table>
      </Container>
    );
}

export default List