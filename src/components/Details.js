import React, { Component } from 'react';
import {ProductConsumer} from '../Context';
import {Link} from 'react-router-dom';
import {ButtonContainer} from './Button';

class Details extends Component {
  render() {
    return (
      <ProductConsumer>
        {value => {
          const {id,
                company,
                img,
                price,
                title,
                info,
                inCart
          } = value.detailProduct;
          return (
            <div className="container py-5">
                {/* title */}
              <div className="row">
                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                  <h1>{title}</h1>
                </div>
              </div>
              {/* end title */}
              {/* product info */}
              <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                  <img src={img} className="img-fluid" alt="product" />
                </div>
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                <h1>商品名 : {title}</h1>    
                <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                  製造元：<span className="text-uppercase">
                    {company}
                  </span>
                </h4>
                <h4 className="text-blue">
                  <strong>
                    <span>￥</span>{price}
                  </strong>
                </h4>
                <p className="text-capitalize font-weight-bold mt-3 mb-0">
                  商品情報:
                </p>
                  <p className="text-muted lead">{info}</p>
                  {/* button */}
                  <div>
                    <Link to="/">
                      <ButtonContainer>
                        買い物を続ける
                      </ButtonContainer>
                    </Link>
                    <ButtonContainer 
                      cart
                      disabled={inCart?true:false} 
                      onClick={()=>{
                      value.addToCart(id);
                      value.openModal(id);
                    }}>
                      {inCart ? "追加済み" : "カートに追加"}
                    </ButtonContainer>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </ProductConsumer>
    );
  }
}

export default Details;