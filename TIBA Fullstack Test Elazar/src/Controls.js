import React from 'react';
import styled from 'styled-components';


function Controls(props) {
    return (
      <ControlsWrapper>
        <AddProduct onClick={props.handleAddProduct}>Add Product</AddProduct>
        <Search placeholder='Search..' onChange={props.onFilter}></Search>
        <SortedBy onChange={props.onSort}>
          <Option>CreatedDate</Option>
          <Option>Price</Option>
        </SortedBy>
      </ControlsWrapper>          
    );
}

export default Controls

const ControlsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 500px;
  margin-bottom: 10px;
`

const AddProduct = styled.button`
  cursor: pointer;
  white-space: nowrap;
  background: linear-gradient(180deg,#f1e9c4 0%,#fffce2 38%,#debf4d 40%,#efebcf 100%);
  border-radius: 100px;
  border: 0.5px solid rgba(0%,0%,0%,0.2);
  border-width: 0.5px 0.5px 0.5px 0.5px;
  padding: 4px 22px 5px 22px;
  color: #574317;
  font-weight: 600;
`

const Search = styled.input`
  
`

const SortedBy = styled.select`

`

const Option = styled.option`

`