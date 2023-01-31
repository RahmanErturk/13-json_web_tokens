import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";

export default function () {
  return (
    <div className="main-box">
      <img
        className="main-pic"
        src="https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="bg-pic"
      />
      <h1>Welcome to Filmbox...</h1>
      <Link className="main-link" to="/photos">
        <h3>Let's Start</h3>
      </Link>
    </div>
  );
}
