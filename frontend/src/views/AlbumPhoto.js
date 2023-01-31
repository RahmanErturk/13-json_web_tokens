import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { photoAppContext } from "../Context/PhotoProvider";

import { Container, Button } from "react-bootstrap";
import LikeBtn from "@mui/icons-material/FavoriteBorder";
import FilledLikeBtn from "@mui/icons-material/Favorite";

export default function AlbumPhoto() {
  const { albumId, photoId } = useParams();
  const albumPhotoId = Number(photoId.split("photo").join(""));
  console.log(+albumPhotoId);

  const navigate = useNavigate();

  const { allAlbums, getAlbumPhotos, photos } = useContext(photoAppContext);

  const [photo, setPhoto] = useState({});

  useEffect(() => {
    fetch(`/api/photos/${albumPhotoId}`)
      .then((response) => response.json())
      .then((data) => setPhoto(data));
  }, [photoId]);

  const indexOfAlbum = allAlbums.findIndex((album) => album.id === +albumId);

  const removeFromAlbum = (id) => {
    const indexOfPhoto = allAlbums[indexOfAlbum].photos.findIndex(
      (i) => i === id
    );
    const deletedAlbumPhotos = allAlbums[indexOfAlbum].photos.splice(
      indexOfPhoto,
      1
    );

    fetch(`/api/albums/${+albumId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        photos: [...allAlbums[indexOfAlbum].photos],
      }),
    }).then((res) => {
      res.status === 202 ? getAlbumPhotos() : console.error(res.status);
      navigate(`/albums/${+albumId}`);
    });
  };

  const like = photos.find((p) => p.id === +albumPhotoId);

  return (
    <Container className="d-flex justify-content-center">
      <div style={{ padding: "30px 0 90px 0" }}>
        <img style={{ maxWidth: "100%", height: "100%" }} src={photo.url} />
        <div className="my-3">
          <Button
            className="mt-1"
            onClick={() => removeFromAlbum(albumPhotoId)}
          >
            Remove from{" "}
            {allAlbums[indexOfAlbum] ? allAlbums[indexOfAlbum].name : "Album"}
          </Button>
          {like ? (
            like.isLiked ? (
              <FilledLikeBtn
                className="mx-5 like-btn"
                onClick={() => likePhoto(+albumPhotoId)}
              />
            ) : (
              <LikeBtn
                className="mx-5"
                onClick={() => likePhoto(+albumPhotoId)}
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
