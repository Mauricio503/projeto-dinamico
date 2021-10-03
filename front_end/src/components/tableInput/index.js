
import React from "react";
import { Table } from 'semantic-ui-react';
import Select from "../../components/select";
import Input from "../../components/input";

const TableInput = ({ columns = [],list = [],columnsDefault = null, onChange="" }) => {
    return (
        <Table fixed>
        <Table.Header>
          <Table.Row>
            {columns.map(e => {
                return <Table.HeaderCell width={e.size}>{e.name}</Table.HeaderCell>
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          
          {list.map((e,i) => {
            return <Table.Row>
            {e.colunas.map(c => {
              return <Table.Cell>
              {c.type === "input" &&<Input id="standard-basic" style={{width:"100%"}} onChange={(event) => onChange(i,c.name,event.target.value)}/> ||
              (c.type === "select" && <Select />) ||
              (c.type === "text" && c.name)}</Table.Cell>  
            })}
          </Table.Row>
          })}
          {/*columnsDefault.map(c => {
            return <Table.Cell>{(c.type === "input" && <Input id="standard-basic" style={{width:"100%"}} onChange={onChange}/>) || 
            (c.type === "select" && <Select />) ||
            (columnsDefault.type === "text" && columnsDefault.name)
            }</Table.Cell>
          })*/}
      
            
        </Table.Body>
    </Table>
    );
  }

export default TableInput