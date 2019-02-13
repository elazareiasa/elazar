import React from 'react';
import styled from "styled-components"
import Modal from 'react-responsive-modal';

function AddProductModal({onClose, open, onChange, onBtnClick, categories, btnText}) {
  return(
    <Modal open={open} onClose={onClose} center>
    <Container>
      <H3>Fill fields </H3>
      <Ul>
        <Li>Name<input id='Name' onChange={onChange}></input></Li>
        <Li>Category
          <Select id='Category' onChange={onChange}>
            {categories.map((categorie, index) => <option key={index}>{categorie}</option>)}
          </Select></Li>
        <Li>Price<input id='Price' onChange={onChange} type="number"></input></Li>
        
      </Ul>
      <Button onClick={onBtnClick}>{btnText}</Button>
    </Container>
   
    </Modal>
  )

}

export default AddProductModal

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align:center;

`

const Ul = styled.ul`
  display: block;
`

const Li = styled.li`
  display: flex;
  justify-content: space-between;
  width: 250px;
  padding:2px;
`

const Select = styled.select`
  width: 173px;
`

const Button = styled.button`
  width:120px;
  margin: 0 auto;
  cursor: pointer;
  background: linear-gradient(180deg,#ce8 0%,#592 100%);
  border-radius: 100px;
  border: 0.5px solid #8c4;
  border-width: 0.5px 0.5px 0.5px 0.5px;
  padding: 7px 20px 7px 20px;
  // color: yellow;
  color: #372;
  // text-shadow: 0px 1px 0px rgba(255,255,255,0.5)
`

const H3 = styled.h3`
  margin:0;
  color: #372;
`