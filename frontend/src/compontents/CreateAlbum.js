import { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { photoAppContext } from "../Context/PhotoProvider";

export default function CreateAlbum() {
  const { getUser, loggedInCookie, user } = useContext(photoAppContext);
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/api/auth/users/${loggedInCookie}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        albums: [
          ...user.albums,
          {
            name: input,
            creator: user.userName,
            photos: [],
          },
        ],
      }),
    }).then((res) => {
      res.json();
      getUser();
    });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      style={{ maxWidth: "720px" }}
      className="d-flex"
    >
      <Form.Control
        type="search"
        placeholder="Create a new album"
        className="me-2"
        aria-label="Search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button onClick={handleSubmit} variant="outline-success">
        New Album
      </Button>
    </Form>
  );
}
