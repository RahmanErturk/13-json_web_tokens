import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { photoAppContext } from "../Context/PhotoProvider";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export default function Login() {
  const { loggedInCookie, setLoggedInUser } = useContext(photoAppContext);

  const [value, setValue] = useState({
    email: "",
    password: "",
    errorMessage: "",
  });

  useEffect(() => {
    if (loggedInCookie) {
      navigate("/");
    }
  }, []);

  const navigate = useNavigate();

  const handleForm = (e) => {
    e.preventDefault();

    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: value.email,
        password: value.password,
      }),
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        else throw Error("Email or password incorrect");
      })
      .then((json) => {
        console.log(json.id);
        setLoggedInUser(json.id);
        navigate("/");
      })
      .catch((err) => setValue({ ...value, errorMessage: err.message }));
  };

  return (
    <div className="main-box">
      <img
        className="main-pic"
        src="https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="bg-pic"
      />
      <div className="register">
        <h2>Login</h2>
        <form onSubmit={handleForm}>
          <p id="err-msg">{value.errorMessage}</p>
          <div className="mb-2">
            <input
              type="email"
              placeholder="E-Mail Address"
              required
              value={value.email}
              onChange={(e) => {
                setValue({ ...value, email: e.target.value });
              }}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              required
              value={value.password}
              onChange={(e) => {
                setValue({ ...value, password: e.target.value });
              }}
            />
          </div>
          <Button type="submit" varient="btn-primary">
            Sign-in
          </Button>
        </form>
      </div>
    </div>
  );
}
