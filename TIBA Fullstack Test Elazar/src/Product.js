import React, { Component } from 'react';
import styled from 'styled-components';


class product extends Component {
  // constructor(props){
  //   super(props)

  // }
  render() {
    const {product, onDelete, onEdit} = this.props, {CreatedDate} = product
    const date = CreatedDate.toISOString().split('T')
    const hour = CreatedDate.getHours() + ":" + CreatedDate.getMinutes()
    return (
      <Tr id={product.id} onDoubleClick={onEdit}>
        <Td>{product.Name}</Td>
        <Td>{product.Category}</Td>
        <Td>{product.Price}</Td>
        <Created>
          <Span>{hour}</Span>
          <span>{date[0]}</span>
          <Button id={product.id} onClick={onDelete}>Delete</Button>
        </Created>
      </Tr>
    );
  }
}

export default product;

const Tr = styled.tr`
  width:100%;
  max-width: 400px;
`

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`

const Created = styled(Td)`
display: flex;
justify-content: space-between;
align-items: center;
`

const Button = styled.button`
  margin-left: 10px;
`

const Span = styled.span`
  padding: 0 5px;
  color: green;
  font-weight:bold;
  font-size:12px;
`