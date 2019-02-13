import React, { Component } from 'react';
import styled from 'styled-components';
import AddProductModal from './AddProductModal';

import Controls from './Controls';
import Products from './Products';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      searchValue: '',
      open: false,
      update: false,
      initProducts: [{id:1, Name:"Shirt", Category:'Sport',Price:50, CreatedDate:new Date("01/27/2019 12:12")},
                     {id:2, Name:"PS4", Category:'Toys',Price:500, CreatedDate:new Date("01/22/2019 10:27")}
                    ],
      products: [],
      newProduct: {},
      updatedId: '',
      categories: []
    }

  }

  componentDidMount() {
    let products = this.state.initProducts

    this.getCategories().then(categories => this.setState({categories}))
    
    this.setState({products})
    this.updateLocalStprage(products)
  }
  
  getCategories(){
    return fetch("http://localhost:3030/Categories").then(res => (res.json()))
  }

  filterProducts = e => {
    this.setState({searchValue : e.target.value})

  }

  upsertProduct = () => {
    const {products, newProduct, updatedId} = this.state
    const id =  parseInt(updatedId)

    if(!this.isValidProduct(newProduct)) return

    const newProductsArr = [...products];
    if(!updatedId){
      const CreatedDate = new Date()
      let id = 1 + products[products.length - 1].id
      newProductsArr.push({...newProduct, CreatedDate, id})
    }
    else{
      const index = newProductsArr.findIndex(product => product.id === id)
      const {CreatedDate} = newProductsArr[index];
      newProductsArr[index] = {...newProduct, CreatedDate, id}
    }    
    this.setState({products: newProductsArr, newProduct: {}, open: false, updatedId:''})
    this.updateLocalStprage(products)
  }

  editProduct = e => {
    const updatedId = e.currentTarget.id
    this.setState({update: true, updatedId})
    this.onOpenModal()
  }

  isValidProduct = ({Name, Price, Category}) => {
    let isValid = true
    if(!Name || Name.length > 50){
      isValid = !isValid
      alert('Please Enter a name less than 50 characters')
    } 

    else if(!Category || Category === "Choose") {
      isValid = !isValid
      alert("Please Choose a Category")
    }

    else if(!Price || isNaN(parseInt(Price)) || parseInt(Price) <= 0){
      isValid = !isValid
      alert('Please Enter a price greater than zero')
    }

    return isValid
  }

  handleInputChange = e => {
    const {newProduct} = this.state
    this.setState({    
      newProduct: {...newProduct, [e.target.id]: e.target.value }
    })
  }

  handleDelete = e => {
    const products = this.state.products.filter(product => product.id !== parseInt(e.target.id))
    localStorage.setItem("products", JSON.stringify(products))
    this.setState({products})
  }

  sortProducts = e => {
    const sortBy = e.target.value
    let {products} = this.state 
    products.sort((a,b) => a[sortBy] > b[sortBy] ? 1 : -1 ); 
    this.setState({products})
  }

  onOpenModal = () => {
    this.setState({ open: true });
  }
 
  onCloseModal = () => {
    this.setState({ open: false, update: false });
  }

  updateLocalStprage = products => {
    localStorage.setItem("products", JSON.stringify(products))
  }

  render() {
    const {products, open, searchValue, categories, update} = this.state
    const {onOpenModal, onCloseModal, handleInputChange, upsertProduct, sortProducts} = this
    const buttonText = update ? 'Edit' : 'Add';

    return (
      <Container className="App">
        <AddProductModal open={open} onClose={onCloseModal} onChange={handleInputChange} onBtnClick={upsertProduct} btnText={buttonText} categories={categories}/>

        <Controls handleAddProduct={onOpenModal} onSort={sortProducts} onFilter={this.filterProducts}/>
        <Products products={products} searchValue={searchValue} onDelete={this.handleDelete} onEdit={this.editProduct}/>
          
      </Container>
    );
  }
}

export default App;

const Container = styled.div`
  box-sizing: border-box;
  display flex;
  width:400px;
  flex-direction: column;
  margin: 15px auto;
`
