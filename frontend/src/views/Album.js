import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import AlbumPhotoPreview from "../compontents/AlbumPhotoPreview";

import { photoAppContext } from "../Context/PhotoProvider";

import LikeBtn from "@mui/icons-material/FavoriteBorder";
import FilledLikeBtn from "@mui/icons-material/Favorite";

export default function () {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const { getAlbumPhotos, album, setAlbum, albumPhotos, getAllAlbums } =
    useContext(photoAppContext);

  const [nameChange, setNameChange] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch(`/api/albums/${albumId}`)
      .then((res) => res.json())
      .then((data) => setAlbum(data));
  }, [albumId]);

  useEffect(getAlbumPhotos, [album]);

  const removeFromAlbum = (id) => {
    const index = album.photos.findIndex((a) => a === id);

    const updatedAlbumPhotos = album.photos.splice(index, 1);

    fetch(`/api/albums/${albumId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        photos: [...album.photos],
      }),
    }).then((res) =>
      res.status === 202 ? getAlbumPhotos() : console.error(res.status)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/api/albums/${album.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: input,
      }),
    }).then((res) => {
      res.json();
      location.reload();
    });

    setNameChange(false);
  };

  const mappedAlbumPhotos = albumPhotos.map((p, i) => (
    <Col key={i} className="mb-5">
      <AlbumPhotoPreview albumId={album.id} photo={p} />
      <Button className="mt-1" onClick={() => removeFromAlbum(p.id)}>
        Remove from {album.name}
      </Button>
      {p.isLiked ? (
        <FilledLikeBtn
          className="mx-5 like-btn"
          onClick={() => likePhoto(+photoId)}
        />
      ) : (
        <LikeBtn className="mx-5" onClick={() => likePhoto(+photoId)} />
      )}
    </Col>
  ));

  return (
    <Container>
      <div className="my-2 mb-4">
        <h2 className="album-title">{album.name}</h2>
        {!nameChange ? (
          <Button
            onClick={() => setNameChange(true)}
            variant="outline-secondary"
          >
            Change Album Name
          </Button>
        ) : (
          <Form
            onSubmit={handleSubmit}
            style={{ maxWidth: "720px" }}
            className="d-flex"
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

      <Row>
        {album.photos ? (
          album.photos.length === 0 ? (
            <div>
              <h5 className="mt-5">
                There isn't any photo in this album. Do you want to add some
                photos? :)
              </h5>
              <Button className="mt-2" onClick={() => navigate("/photos")}>
                Add Photos
              </Button>
            </div>
          ) : (
            mappedAlbumPhotos
          )
        ) : (
          <h4>Sorry, there is an error :(</h4>
        )}

        {/* <PhotoPreview photo={{id:1}} /> */}
      </Row>
    </Container>
  );
}
