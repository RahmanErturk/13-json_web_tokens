import { Link } from "react-router-dom";

export default function ({ photo }) {
  return (
    <div className="img-preview" style={{ marginBottom: "10px" }}>
      <Link to={"/photos/" + photo._id}>
        <img src={photo.url} />
      </Link>
    </div>
  );
}
