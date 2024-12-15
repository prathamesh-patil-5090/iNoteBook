import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useLocation } from 'react-router-dom';

function NavBar() {
  let location = useLocation();

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
            <Nav.Link href="/login">
              <button className="btn btn-primary mx-2">Login</button>
            </Nav.Link>
            <Nav.Link href="/signup">
              <button className="btn btn-success mx-2">Signup</button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;