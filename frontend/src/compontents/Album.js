import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import AlbumPhotoPreview from "../compontents/AlbumPhotoPreview";

import { photoAppContext } from "../Context/PhotoProvider";

import LikeBtn from "@mui/icons-material/FavoriteBorder";
import FilledLikeBtn from "@mui/icons-material/Favorite";

export default function Album({ doNotRemove, album }) {
  const navigate = useNavigate();
  const { likePhoto, dislikePhoto, user, removeFromAlbum } =
    useContext(photoAppContext);

  const mappedAlbumPhotos = album?.photos?.map((p, i) => (
    <Col key={i} className="mb-5">
      <AlbumPhotoPreview userId={user.id} albumId={album._id} photo={p} />
      {doNotRemove && (
        <Button className="mt-1" onClick={() => removeFromAlbum(p)}>
          Remove from {album.name}
        </Button>
      )}

      {user.likedPhotos?.includes(doNotRemove ? p : p._id) ? (
        <FilledLikeBtn
          className={doNotRemove ? "mx-4 like-btn" : "like-btn"}
          onClick={() => dislikePhoto(doNotRemove ? p : p._id)}
        />
      ) : (
        <LikeBtn
          className={doNotRemove && "mx-4"}
          onClick={() => likePhoto(doNotRemove ? p : p._id)}
        />
      )}
    </Col>
  ));

  return (
    <Container>
      <Row className="mt-4 ">
        {album?.photos ? (
          album.photos?.length === 0 ? (
            <div>
              <h5 className="mt-5">
                There isn't any photo in this album. Do you want to add some
                photos? :)
              </h5>
            </div>
          ) : (
            mappedAlbumPhotos
          )
        ) : (
          <h4>Sorry, there is an error :(</h4>
        )}
      </Row>
    </Container>
  );
}
