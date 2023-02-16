import { useContext, useState, useEffect } from "react";

import { photoAppContext } from "../Context/PhotoProvider";

import PhotoPreview from "../compontents/PhotoPreview";

import { Container, Row, Col, Button, OverlayTrigger } from "react-bootstrap";
import LikeBtn from "@mui/icons-material/FavoriteBorder";
import FilledLikeBtn from "@mui/icons-material/Favorite";

export default function LikedPhotos() {
  const { getAllPhotos, photos, removePhoto, popover, user, dislikePhoto } =
    useContext(photoAppContext);

  const likedPhotos = photos.filter((photo) =>
    user.likedPhotos?.includes(photo._id)
  );

  console.log(likedPhotos);

  return (
    <Container>
      <h2 className="album-title">Liked Photos</h2>
      <Row>
        {likedPhotos.map((p, i) => (
          <Col key={i} className="mb-5">
            <PhotoPreview className="photos" photo={p} />
            <OverlayTrigger
              trigger="click"
              placement="right"
              overlay={popover(p._id)}
            >
              <Button variant="success">Add to Album</Button>
            </OverlayTrigger>
            <Button
              className="mx-3"
              onClick={() => removePhoto(p._id, getAllPhotos)}
            >
              Remove
            </Button>

            <FilledLikeBtn
              className="mx-4 like-btn"
              onClick={() => dislikePhoto(p._id)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
