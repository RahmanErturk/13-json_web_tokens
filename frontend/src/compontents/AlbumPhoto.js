import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { photoAppContext } from "../Context/PhotoProvider";

import { Container, Button } from "react-bootstrap";
import LikeBtn from "@mui/icons-material/FavoriteBorder";
import FilledLikeBtn from "@mui/icons-material/Favorite";

export default function AlbumPhoto({ doNotRemove }) {
  const { userId, albumId, photoId } = useParams();

  const { album, likePhoto, dislikePhoto, user, removeFromAlbum } =
    useContext(photoAppContext);

  const [photo, setPhoto] = useState({});

  useEffect(() => {
    fetch(`/api/photos/${photoId}`)
      .then((response) => response.json())
      .then((data) => setPhoto(data));
  }, [photoId]);

  return (
    <Container className="d-flex justify-content-center">
      <div style={{ padding: "30px 0 90px 0" }}>
        <img style={{ maxWidth: "100%", height: "100%" }} src={photo?.url} />
        <div className="my-3">
          {doNotRemove && (
            <Button className="mt-1" onClick={() => removeFromAlbum(photoId)}>
              Remove from {album ? album.name : "Album"}
            </Button>
          )}

          {photo ? (
            user.likedPhotos?.includes(photoId) ? (
              <FilledLikeBtn
                className={doNotRemove ? "mx-3 like-btn" : "like-btn"}
                onClick={() => dislikePhoto(photoId)}
              />
            ) : (
              <LikeBtn
                className={doNotRemove && "mx-3"}
                onClick={() => likePhoto(photoId)}
              />
            )
          ) : (
            <h2>Sorry, there is an error :(</h2>
          )}
        </div>
      </div>
    </Container>
  );
}
