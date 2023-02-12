import { Link } from "react-router-dom";

export default function AlbumPhotoPreview({ albumId, photo }) {
  return (
    <div className="img-preview" style={{ marginBottom: "10px" }}>
      <Link to={"/albums/" + albumId + "/photo/" + photo._id}>
        <img src={photo.url} />
      </Link>
    </div>
  );
}
