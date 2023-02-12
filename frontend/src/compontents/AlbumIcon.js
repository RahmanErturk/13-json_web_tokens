import { Link } from "react-router-dom";

export default function ({ album }) {
  return (
    <Link className="album-link" to={"/albums/" + album._id}>
      <div className="album-icon">
        <h3 className="album-name">{album.name}</h3>
      </div>
    </Link>
  );
}
