import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {ButtonContainer} from './Button';

class NavBar extends Component {
  render() {
    return (
      <NavWrapper className="navbar navbar-expand-sm bg-primary navbar-dark px-sm-5">        
        <ul className="navbar-nav align-items-center">
          <li className="nav-item ml-5">
            <Link to="/" className="nav-link"> 
              HOME
            </Link>
            </li>
        </ul>
        <Link to="/Cart" className="ml-auto cart-link">
            <span className="mr-2">
              <i className="fas fa-cart-plus" ></i>
            </span>
        </Link> 
      </NavWrapper>
    );
  }
}

const NavWrapper = styled.nav`
    background:var(--mainGray) !important;
    .nav-link{
      color:var(--mainWhite) !important;
      font-size:1.3rem;
      text-transform:capitalize;
    }
    .cart-link{
      text-transform:capitalize;
      font-size:1.4rem;
      background:transparent;
      border:0.05rem solid var(--mainWhite);
      color:var(--mainWhite);
      border-radius:0.5rem;
      padding:0.2rem 0.5rem;
      cursor:pointer;
      margin:0.2rem 0.5rem 0.2rem 0;
      transition:all 0.5s ease-in-out;
      
      &:hover{
          background:var(--mainDark);
          color:var(--mainWhite);
          border-color:var(--mainDark);
      }
    }
`;


export default NavBar;