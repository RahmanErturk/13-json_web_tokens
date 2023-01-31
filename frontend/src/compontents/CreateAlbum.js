import { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { photoAppContext } from "../Context/PhotoProvider";

export default function CreateAlbum() {
  const { getAllAlbums } = useContext(photoAppContext);
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/api/albums`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: input,
        photos: [],
      }),
    }).then((res) => {
      res.json();
      getAllAlbums();
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
