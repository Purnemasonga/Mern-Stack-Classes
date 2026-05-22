import { useContext, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { CartContext } from "../service/CartProvider";
import ViewUsers from './../pages/ViewUsers';
import axios from "axios";

function NavBar() {
  const [count, setCartCount] = useState([])
  const fetchCartProducts = async () => {
    try {
      const userId = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:5000/cart/get-cartproducts/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setCartCount(response.data.AllProducts)
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    fetchCartProducts()
  }, [count])


  return (
    <div id="navbar-container" style={{ position: "sticky", top: "0px", zIndex: "3" }}>
      <Navbar expand="lg" id="nav-container" bg="light" variant="light">
        <Container>
          <Navbar.Brand>
            <Link id="brand-name" to="/">Think Mart</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                {" "}
                <Link to="/home">Home</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/register">Register</Link>
              </Nav.Link>
              <NavDropdown title="Products" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/view-products">View Products</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="">Edit Products</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/cart">Cart Products</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="">Delete Products</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link to="/ViewUsers">View Users</Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <div className="d-flex align-items-center gap-2">
              <Link to="/login" className="btn btn-primary d-flex align-items-center gap-1">
                Login
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-box-arrow-in-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                  />
                </svg>
              </Link>

              <Link to="/cart" className="btn btn-outline-dark">
                Cart <strong>{count.length}</strong>
              </Link>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;