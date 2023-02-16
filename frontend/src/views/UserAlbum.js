import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import Album from "../compontents/Album";

import { photoAppContext } from "../Context/PhotoProvider";

import LikeBtn from "@mui/icons-material/FavoriteBorder";
import FilledLikeBtn from "@mui/icons-material/Favorite";

export default function () {
  const { userId, albumId } = useParams();

  const { getAlbumPhotos, album, setAlbum, loggedInCookie, user, getUser } =
    useContext(photoAppContext);

  const [nameChange, setNameChange] = useState(false);
  const [input, setInput] = useState("");

  const navigate = useNavigate();

  useEffect(getUser, [albumId]);

  useEffect(() => {
    setAlbum(user?.albums?.find((a) => a._id === albumId));
    getAlbumPhotos();
  }, [user]);

  const albumIdIndex = user?.albums?.findIndex((a) => a._id === albumId);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAlbums = [...user?.albums];
    newAlbums[albumIdIndex] = {
      ...newAlbums[albumIdIndex],
      name: input,
    };

    fetch(`/api/auth/users/${loggedInCookie}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        albums: newAlbums,
      }),
    }).then((res) => {
      res.json();
      location.reload();
    });

    setNameChange(false);
  };

  const doNotRemove = true;

  return (
    <Container>
      <div className="my-2 mb-4">
        <h2 className="album-title">{album?.name}</h2>
        <Button onClick={() => navigate("/photos")}>Add Photos</Button>
        {!nameChange ? (
          <Button
            className="mx-3"
            onClick={() => setNameChange(true)}
            variant="outline-secondary"
          >
            Change Album Name
          </Button>
        ) : (
          <Form
            onSubmit={handleSubmit}
            style={{ maxWidth: "720px" }}
            className="d-flex mt-3"
          >
            <Form.Control
              type="search"
              placeholder="Change album name..."
              className="me-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={handleSubmit} variant="outline-success">
              Change Name
            </Button>
          </Form>
        )}
      </div>
      <Album doNotRemove={doNotRemove} album={album} />
    </Container>
  );
}
