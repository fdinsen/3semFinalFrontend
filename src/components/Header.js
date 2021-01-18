import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import facade from '../apiFacade.js';

function Header(props) {
  const [user, setUser] = useState(null);

  useEffect(e => {
    console.log(facade.getUser());
    if (facade.getUser() && !user) {
      setUser(facade.getUser());
    }
  })

  function performLogout() {
    facade.logout();
    setUser(null);
    props.setLoggedIn(false);
  }

  return (
    <Container>
      <Navbar bg="light" expand="lg">
        <Nav.Item>
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
        </Nav.Item>
        {props.loggedIn && (
          <>
            <Nav.Item>
              <NavLink to="/contacts" className="nav-link">
                Contacts
            </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/create" className="nav-link">
                Create Contact
            </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/" onClick={performLogout} className="nav-link">
                Logout
            </NavLink>
            </Nav.Item>
          </>
        )}
      </Navbar>
    </Container>
  );
}
export default Header;
