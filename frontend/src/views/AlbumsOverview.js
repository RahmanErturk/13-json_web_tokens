import { useContext } from "react";
import { photoAppContext } from "../Context/PhotoProvider";
import { Container, Row, Col, Button } from "react-bootstrap";
import AlbumIcon from "../compontents/AlbumIcon";
import CreateAlbum from "../compontents/CreateAlbum";

export default function () {
  const { allAlbums, user, loggedInCookie, getUser } =
    useContext(photoAppContext);

  const deleteAlbum = (id) => {
    const albumIdIndex = user.albums.indexOf((a) => a._id === id);

    const newAlbums = user.albums.splice(albumIdIndex, 1);

    try {
      fetch(`/api/auth/users/${loggedInCookie}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          albums: user.albums,
        }),
      }).then((res) =>
        res.status === 201 ? getUser() : console.error(res.status)
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
        <h2 style={{ margin: "0 30px" }}>Albums</h2>
        {allAlbums.map((a, i) => (
          <Col key={i}>
            <AlbumIcon album={a} />
          </Col>
        ))}
      </Row>
      <Row>
        {user.albums?.length > 0 && (
          <>
            <h2 style={{ margin: "20px 30px" }}>Your Albums</h2>
            {user.albums.map((a, i) => (
              <Col key={i}>
                <AlbumIcon album={a} user={user} />
                <Button
                  onClick={() => deleteAlbum(a._id)}
                  className="mx-5"
                  variant="outline-success"
                >
                  Remove
                </Button>
              </Col>
            ))}
          </>
        )}
      </Row>
    </Container>
  );
}
