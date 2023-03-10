import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import { photoAppContext } from "../Context/PhotoProvider";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

export default function () {
  const { setLoggedInUser } = useContext(photoAppContext);
  const navigate = useNavigate();

  const clickHandler = () => {
    fetch("/api/auth/logout", {
      credentials: "include",
    }).then((res) => {
      if (res.status === 200) {
        setLoggedInUser("");
        navigate("/login");
      }
    });
  };

  const loggedInCookie = Cookies.get("logged_in");

  return (
    <>
      <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <span style={{ color: "rgb(24, 160, 160)" }}>my </span>
            <span style={{ color: "rgb(255, 145, 0)" }}>Gallery</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          {loggedInCookie ? (
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Link className="nav-link" to="photos">
                  Photos
                </Link>

                <Link className="nav-link" to="albums">
                  Albums
                </Link>

                <Link className="nav-link" to="liked-photos">
                  Liked Photos
                </Link>
              </Nav>
              <Button variant="outline-success" onClick={clickHandler}>
                Log out
              </Button>
            </Navbar.Collapse>
          ) : (
            <Navbar.Collapse>
              <Nav className="me-auto"></Nav>
              <Link style={{ color: "silver" }} to="register">
                Sign-up
              </Link>
              <Link to="/login">
                <Button className="mx-3" variant="outline-success">
                  Sign-in
                </Button>
              </Link>
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>
    </>
  );
}
