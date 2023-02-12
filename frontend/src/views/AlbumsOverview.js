import { useContext } from "react";
import { photoAppContext } from "../Context/PhotoProvider";
import { Container, Row, Col, Button } from "react-bootstrap";
import AlbumIcon from "../compontents/AlbumIcon";
import CreateAlbum from "../compontents/CreateAlbum";

export default function () {
  const { allAlbums, getAllAlbums } = useContext(photoAppContext);

  const deleteAlbum = (id) => {
    try {
      fetch(`/api/albums/${id}`, {
        method: "DELETE",
      }).then((res) =>
        res.status === 204 ? getAllAlbums() : console.error(res.status)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <div className="form">
        <h2>Create Albums</h2>
        <CreateAlbum />
      </div>
      <Row>
        <h2 style={{ margin: "0 30px" }}>Your Albums</h2>
        {allAlbums.map((a, i) => (
          <Col key={i}>
            <AlbumIcon album={a} />
            <Button
              onClick={() => deleteAlbum(a._id)}
              className="mx-5"
              variant="outline-success"
            >
              Remove
            </Button>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
