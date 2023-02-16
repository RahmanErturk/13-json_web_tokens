import { useState } from "react";

import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [value, setValue] = useState({
    userName: "",
    email: "",
    password: "",
    passwordAgain: "",
    errorMessage: "",
  });

  const navigate = useNavigate();

  const handleForm = (e) => {
    e.preventDefault();

    fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        userName: value.userName,
        email: value.email,
        password: value.password,
      }),
    })
      .then((res) => {
        if (res.status === 201) return res.json();
        else throw Error("Email is already in use");
      })
      .then((json) => navigate("/login"))
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
        <div className="sign_in_cont mt-3 mb-5">
          <h5 style={{ color: "silver" }}>Have you already signed up?</h5>
          <Link to="/login">
            <Button className="mx-3" variant="outline-success">
              Sign-in
            </Button>
          </Link>
        </div>
        <div>
          <h2>Register</h2>
          <form onSubmit={handleForm}>
            <p id="err-msg" style={{ color: "silver" }}>
              {value.errorMessage}
            </p>
            <div className="mb-2">
              <input
                type="text"
                placeholder="User Name"
                required
                value={value.userName}
                onChange={(e) =>
                  setValue({ ...value, userName: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <input
                type="email"
                placeholder="E-Mail Address"
                required
                value={value.email}
                onChange={(e) => setValue({ ...value, email: e.target.value })}
              />
            </div>
            <div className="mb-2">
              <input
                type="password"
                placeholder="Password"
                required
                value={value.password}
                onChange={(e) =>
                  setValue({ ...value, password: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                required
                value={value.passwordAgain}
                onChange={(e) =>
                  setValue({ ...value, passwordAgain: e.target.value })
                }
              />
            </div>
            <Button type="submit" varient="btn-primary">
              Sign-up
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
