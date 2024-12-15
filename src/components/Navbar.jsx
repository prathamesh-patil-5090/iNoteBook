import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function NavBar() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  return (
    <Navbar expand="lg" className="bg-dark navbar-dark">
      <Container>
        <Navbar.Brand href="/">iNoteBook</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className={location.pathname === "/" ? "active" : ""}>Home</Nav.Link> 
            <Nav.Link href="/about" className={location.pathname === "/about" ? "active" : ""}>About</Nav.Link>
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <button className="btn btn-danger mx-2" onClick={handleLogout}>Logout</button>
            ) : (
              <>
                <Nav.Link href="/login">
                  <button className="btn btn-primary mx-2">Login</button>
                </Nav.Link>
                <Nav.Link href="/signup">
                  <button className="btn btn-success mx-2">Signup</button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;