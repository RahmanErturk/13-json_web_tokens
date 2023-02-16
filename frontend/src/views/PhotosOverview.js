import { useContext } from "react";

import { Container, Row, Col, Button, OverlayTrigger } from "react-bootstrap";
import PhotoPreview from "../compontents/PhotoPreview";

import { photoAppContext } from "../Context/PhotoProvider";

import LikeBtn from "@mui/icons-material/FavoriteBorder";
import FilledLikeBtn from "@mui/icons-material/Favorite";

export default function () {
  const {
    getAllPhotos,
    photos,
    removePhoto,
    popover,
    likePhoto,
    dislikePhoto,
    user,
  } = useContext(photoAppContext);

  return (
    <Container>
      <h2 className="album-title">All Photos</h2>
      <Row>
        {photos.map((p) => (
          <Col key={p._id} className="mb-5">
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

            {user.likedPhotos?.includes(p._id) ? (
              <FilledLikeBtn
                className="mx-4 like-btn"
                onClick={() => dislikePhoto(p._id)}
              />
            ) : (
              <LikeBtn className="mx-4" onClick={() => likePhoto(p._id)} />
            )}
          </Col>
        ))}
      </Row>
    </Container>
  );
}
