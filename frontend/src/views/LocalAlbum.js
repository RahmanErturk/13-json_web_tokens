import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import Album from "../compontents/Album";

import { photoAppContext } from "../Context/PhotoProvider";

export default function () {
  const { albumId } = useParams();

  const { getAlbumPhotos, album, setAlbum } = useContext(photoAppContext);

  useEffect(() => {
    try {
      fetch(`/api/albums/${albumId}`)
        .then((res) => res.json())
        .then((data) => {
          setAlbum(data);
        });
    } catch (error) {
      console.error(error);
    }
  }, [albumId]);

  useEffect(getAlbumPhotos, [album?._id]);

  return <Album remove album={album} />;
}
