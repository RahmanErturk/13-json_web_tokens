import { useContext } from "react";

import { Container, Row, Col, Button, OverlayTrigger } from "react-bootstrap";
import PhotoPreview from "../compontents/PhotoPreview";

import { photoAppContext } from "../Context/PhotoProvider";

import LikeBtn from "@mui/icons-material/FavoriteBorder";
import FilledLikeBtn from "@mui/icons-material/Favorite";

export default function () {
  const { getAllPhotos, photos, removePhoto, popover, likePhoto } =
    useContext(photoAppContext);

  return (
    <Container>
      <h2 className="album-title">Alle Fotos</h2>
      <Row>
        {photos.map((p) => (
          <Col key={p.id} className="mb-5">
            <PhotoPreview className="photos" photo={p} />
            <OverlayTrigger
              trigger="click"
              placement="right"
              overlay={popover(p.id)}
            >
              <Button variant="success">Add to Album</Button>
            </OverlayTrigger>
            <Button
              className="mx-3"
              onClick={() => removePhoto(p.id, getAllPhotos)}
            >
              Remove
            </Button>

            {p.isLiked ? (
              <FilledLikeBtn
                className="mx-5 like-btn"
                onClick={() => likePhoto(p.id)}
              />
            ) : (
              <LikeBtn className="mx-5" onClick={() => likePhoto(p.id)} />
            )}
          </Col>
        ))}
      </Row>
    </Container>
  );
}
