import React from "react";
import { Navbar, Nav, Container, NavLink } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>SoJu Sushi</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="cart">
                <NavLink id="RouterNavLink" to="/cart">
                  <i className="fas fa-shopping-cart"></i>Cart
                </NavLink>
              </LinkContainer>
              <LinkContainer to="login">
                <NavLink id="RouterNavLink" to="/login">
                  <i className="fas fa-user"></i>Sign In
                </NavLink>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
