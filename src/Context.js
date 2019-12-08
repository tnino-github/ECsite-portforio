import React, { Component } from 'react';
import { storeProducts, detailProduct } from './Data';

const ProductContext = React.createContext();



class ProductProvider extends Component {
  state = {
    products:[],
    detailProduct:detailProduct,
    cart:[],
    modalOpen:false,
    modalProduct:detailProduct,
    cartSubTotal:0,
    cartTax:0,
    cartTotal:0
  };
  componentDidMount(){
    this.setProducts();
  }

  setProducts = () =>{
    let tempProducts = [];
    let mycart = JSON.parse(localStorage.getItem("cart"));
    storeProducts.forEach(item =>{
      let singleItem = {...item};
      if(mycart){
        const mycartProduct = mycart.filter(mycartProduct => mycartProduct.id == singleItem.id);
        if(Object.keys(mycartProduct).length !== 0){
          singleItem.inCart = true;
          singleItem.count = mycartProduct.count;
          singleItem.total = mycartProduct.total; 
        }
      }
      tempProducts = [...tempProducts,singleItem];
    })
    
    this.setState(() =>{
      return {products:tempProducts,cart:mycart};
    },()=> {
      if( mycart ){
        this.addTotals();
      }
    });
  };

  getItem = id => {
    const product = this.state.products.find(item => item.id === id)
    return product;
  }
  
  handleDetail = id => {
    const product = this.getItem(id);
    this.setState(()=> {
      return {detailProduct:product}
    });
  };
  
  addToCart = id => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    this.setState(()=>{
      if(this.state.cart){
        return {products:tempProducts,cart:[...this.state.cart,product]};
      }else {
        return {products:tempProducts,cart:[product]};
      }
      
      
    },
    () => {
      this.addTotals();
      if(typeof(Storage) === 'undefined'){ alert('Your Browser Not Supportd'); return; }
      localStorage.setItem("cart", JSON.stringify(this.state.cart));
    }
    );

  };

  openModal = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return {modalProduct:product,modalOpen:true}
    });
  };

  closeModal = id => {
    this.setState(() => {
      return {modalOpen:false}
    });
  };

  increament = id =>{
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item=>item.id === id);

    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count = product.count + 1;
    product.total = product.count * product.price;

    this.setState(
      () => {
        return{cart:[...tempCart]};
      },
      ()=>{
        this.addTotals();
      }
    );
  };

  decrement = id =>{
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item=>item.id === id);

    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count = product.count - 1;
    if( product.count === 0){
      this.removeItem(id);
    }else{
      product.total = product.count * product.price; 
      this.setState(
        () => {
          return{cart:[...tempCart]};
        },
        ()=>{
          this.addTotals();
        }
      );
    }
  };

  removeItem = id => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];

    tempCart = tempCart.filter(item => item.id !== id);

    const index = tempProducts.indexOf(this.getItem(id));
    let removeProduct = tempProducts[index];
    removeProduct.inCart = false;
    removeProduct.count = 0;
    removeProduct.total = 0;
    this.setState(() => {
      return{
        cart:[...tempCart],
        product:[...tempProducts]
      }
    },
    () => {
      this.addTotals();
      localStorage.setItem("cart", JSON.stringify(this.state.cart));
    }
    );
  };

  clearCart = () => {
    this.setState(() => {
      return { cart:[] };
    },()=>{
      localStorage.setItem("cart", JSON.stringify([]));
      this.setProducts();
      this.addTotals();
    });
  };

  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map(item => {subTotal += item.total});
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    this.setState(() => {
      return {
        cartSubTotal: subTotal,
        cartTax: tax,
        cartTotal: total
      };
    })
  }

  render() {
    return (
      <ProductContext.Provider value={{
        ...this.state,
        handleDetail:this.handleDetail,
        addToCart:this.addToCart,
        openModal:this.openModal,
        closeModal:this.closeModal,
        increment:this.increament,
        decrement:this.decrement,
        removeItem:this.removeItem,
        clearCart:this.clearCart,
      }}>
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export  {ProductProvider,ProductConsumer};