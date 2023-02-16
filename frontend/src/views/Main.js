import { useContext } from "react";
import { photoAppContext } from "../Context/PhotoProvider";
import { Link } from "react-router-dom";

export default function () {
  const { loggedInCookie, user } = useContext(photoAppContext);

  return (
    <div className="main-box">
      <img
        className="main-pic"
        src="https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="bg-pic"
      />
      {loggedInCookie ? (
        <>
          <h1>
            welcome
            <span style={{ color: "rgb(255, 145, 0)" }}> {user.userName}</span>
          </h1>
          <Link className="main-link" to="/photos">
            <h3>Lets start!</h3>
          </Link>
        </>
      ) : (
        <>
          <h1>
            my
            <span style={{ color: "rgb(255, 145, 0)" }}> Gallery</span>
          </h1>
          <Link className="main-link" to="/register">
            <h3>Sign up now!</h3>
          </Link>
        </>
      )}
    </div>
  );
}
