import { useState } from "react";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export default function Register() {
  const [value, setValue] = useState({
    userName: "",
    email: "",
    password: "",
    passwordAgain: "",
    errorMessage: "",
  });

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
      .then((res) => res.json())
      .then((json) => console.log(json));
  };
  return (
    <Container>
      <h2>Register</h2>
      <form onSubmit={handleForm}>
        <p id="err-msg">{value.errorMessage}</p>
        <div className="mb-2">
          <input
            type="text"
            placeholder="User Name"
            required
            value={value.userName}
            onChange={(e) => setValue({ ...value, userName: e.target.value })}
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
            onChange={(e) => setValue({ ...value, password: e.target.value })}
          />
        </div>
        <div className="mb-2">
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
    </Container>
  );
}
