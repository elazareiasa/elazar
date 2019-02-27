import React from 'react';
import styled from 'styled-components';
import Product from './Product';


function Products({products, searchValue, onDelete, onEdit}) {

  searchValue = searchValue.toLowerCase()
  products = products.filter(({Name, Category}) => Name.toLowerCase().includes(searchValue) || Category.toLowerCase().includes(searchValue))

    return (
      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Category</Th>
            <Th>Price</Th>
            <Th>Created date</Th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => <Product key={index} product={product} onDelete={onDelete} onEdit={onEdit}/>)}
        </tbody>
      </Table>
    );
  }


export default Products;

const Table = styled.table`
  width:500px;
`

const Th = styled.th`
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: left;
  background-color: #cccccc;
  color: #333;
`
