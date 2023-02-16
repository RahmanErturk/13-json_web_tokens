import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { photoAppContext } from "../Context/PhotoProvider";

import { Container, Button, OverlayTrigger } from "react-bootstrap";
import LikeBtn from "@mui/icons-material/FavoriteBorder";
import FilledLikeBtn from "@mui/icons-material/Favorite";

export default function () {
  const { photoId } = useParams();
  const navigate = useNavigate();

  const { getAllPhotos, popover, removePhoto, likePhoto, dislikePhoto, user } =
    useContext(photoAppContext);

  const [photo, setPhoto] = useState({});

  useEffect(() => {
    try {
      fetch(`/api/photos/${photoId}`)
        .then((response) => response.json())
        .then((data) => setPhoto(data));
    } catch (error) {
      console.error(error);
    }
  }, [photoId]);

  return (
    <Container className="d-flex justify-content-center">
      <div style={{ padding: "30px 0 70px 0" }}>
        <img style={{ maxWidth: "100%", height: "100%" }} src={photo.url} />
        <div className="my-3">
          <OverlayTrigger
            trigger="click"
            placement="right"
            overlay={popover(photoId)}
          >
            <Button variant="success">Add to Album</Button>
          </OverlayTrigger>
          <Button
            className="mx-3"
            onClick={() => removePhoto(photoId, getAllPhotos)}
          >
            Remove
          </Button>
          {user.likedPhotos?.includes(photoId) ? (
            <FilledLikeBtn
              className="like-btn"
              onClick={() => dislikePhoto(photoId)}
            />
          ) : (
            <LikeBtn onClick={() => likePhoto(photoId)} />
          )}
        </div>
      </div>
    </Container>
  );
}
