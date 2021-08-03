import React, { useContext } from "react";

import {Link} from "react-router-dom";
import {Container, Row, Col, NavbarBrand, Navbar} from "reactstrap";
import { Nav, NavItem, NavLink, NavbarToggler, Collapse } from 'reactstrap';

import './header.css'
import { connect } from 'react-redux'
import { logout } from '../actions/authActions'
import useToggler from "./useToggler"
import {ThemeContext} from "./themeContext" 
function Header(props) {
    const [isNavOpen, toggleNav] = useToggler(false);
    const {theme, toggleTheme} = useContext(ThemeContext)
    const guestLinks = 
    <Navbar dark expand="md">
            <NavbarToggler onClick={toggleNav} />
            <Collapse isOpen={isNavOpen} navbar>
                <Nav navbar>
                <NavItem>
                    <NavLink href = "/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/login" >Login</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/signup" >Signup</NavLink>
                </NavItem>
                </Nav>
            </Collapse>
    </Navbar>
    
    const loggedInLinks = 
    <Navbar dark expand="md">
        <NavbarToggler onClick={toggleNav} />
            <Collapse isOpen={isNavOpen} navbar>
                <Nav navbar>
                <NavItem>
                    <NavLink href = "/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/lost" >Lost</NavLink>
                </NavItem>
                <NavItem>
                        <NavLink href="/found">Found</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink onClick = {props.logout} href = "/" >Logout</NavLink>
                </NavItem>
                </Nav>
            </Collapse>
    </Navbar>

    return (
        <header className = "header" style = {{width:"100%"}}>
            <Row className = "main-titles-grandfather">
                <Col md="3" sm="12" className = "main-titles-dad">
                    <NavbarBrand className="mr-auto main-title" href="/"><img src='./logo.png' alt='bmsce logo' />E-Lost and Found</NavbarBrand>
                </Col>
                <Col md="6">
                    <Nav style = {{align:"left"}}>
                        { props.auth.isAuthenticated? loggedInLinks:guestLinks}
                    </Nav>
                </Col>
                <Col md="2">
                    <span className="navbar-text">
                        {props.auth.user? `Welcome ${props.auth.user.name}` : null}
                    </span>
                    <button onClick = {toggleTheme}>{theme} theme</button>
                </Col>
            </Row>
            
            
        </header>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { logout })(Header);