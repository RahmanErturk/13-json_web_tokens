import { useContext } from "react";
import { photoAppContext } from "../Context/PhotoProvider";
import { Link } from "react-router-dom";

export default function AlbumPhotoPreview({ userId, albumId, photo }) {
  const { photos } = useContext(photoAppContext);

  let photoUrl;
  let photoId;
  let path;

  if (!photo?.url) {
    photoUrl = photos.find((p) => p._id === photo)?.url;
    photoId = photo;
    path = `/users/${userId}/albums/${albumId}/photos/${photoId}`;
  } else {
    photoUrl = photo.url;
    photoId = photo._id;
    path = `/albums/${albumId}/photos/${photoId}`;
  }

  return (
    <div className="img-preview" style={{ marginBottom: "10px" }}>
      <Link to={path}>
        <img src={photoUrl} />
      </Link>
    </div>
  );
}
