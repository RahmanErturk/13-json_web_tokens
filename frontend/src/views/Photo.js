import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { photoAppContext } from "../Context/PhotoProvider";

import { Container, Button, OverlayTrigger } from "react-bootstrap";
import LikeBtn from "@mui/icons-material/FavoriteBorder";
import FilledLikeBtn from "@mui/icons-material/Favorite";

export default function () {
  const { photoId } = useParams();
  const navigate = useNavigate();

  const { getAllPhotos, popover, photos } = useContext(photoAppContext);

  const [photo, setPhoto] = useState({});

  /**
   * Um unsere React App (View) mit unserem Backend (Controller und "Model") zu verbinden,
   * machen wir lediglich ein fetch an unseren localhost. Da fetch das Wort "localhost" mag,
   * benutzen wir die dazugehörige IP Adresse.
   *
   * Frontend und Backend befinden sich im selben Hafen (localhost) und haben zwei
   * Stegnummern (3000 und 4000) über die sie erreichbar sind.
   *
   * In einem real world example wäre das optimale Setup, dass sich unser FE und das BE in
   * zwei Docker Container befinden und über festgelegte Wege miteinander kommunizieren.
   * Leider sprengt Docker den Rahmen von diese, Kurs. Ich kann euch aber empfehlen, euch das
   * selbstständig anzuschauen.
   *
   * Den fetch machen wir in Abhängigkeit von unserem Parameter, heißt immer wenn sich der
   * Parameter ändert rufen wir neu die Daten ab
   */

  useEffect(() => {
    fetch(`/api/photos/${photoId}`)
      .then((response) => response.json())
      .then((data) => setPhoto(data));
  }, [photoId]);

  const removePhoto = () => {
    fetch(`/api/photos/${photoId}`, {
      method: "DELETE",
    }).then((res) => {
      res.status === 202 ? getAllPhotos() : console.error(res.status);

      navigate("/photos");
    });
  };

  const like = photos.find((p) => p.id === +photoId);

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
          <Button className="mx-5" onClick={removePhoto}>
            Remove
          </Button>
          {like.isLiked ? (
            <FilledLikeBtn
              className="like-btn"
              onClick={() => likePhoto(+photoId)}
            />
          ) : (
            <LikeBtn onClick={() => likePhoto(+photoId)} />
          )}
        </div>
      </div>
    </Container>
  );
}
