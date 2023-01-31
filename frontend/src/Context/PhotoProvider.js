import React from "react";
import { createContext, useState, useEffect } from "react";

import { Popover } from "react-bootstrap";

export const photoAppContext = createContext();

export default function PhotoProvider({ children }) {
  const [photos, setPhotos] = useState([]);
  const [album, setAlbum] = useState({});
  const [albumPhotos, setAlbumPhotos] = useState([]);
  const [allAlbums, setAllAlbums] = useState([]);

  const getAllAlbums = () => {
    fetch(`/api/albums`)
      .then((response) => response.json())
      .then((data) => setAllAlbums(data));
  };
  useEffect(getAllAlbums, []);

  const getAllPhotos = () => {
    // fetch("/api/photos") und beim package.json => proxy: "http://http://localhost:4001, am Ende npm run build "
    fetch("/api/photos")
      .then((res) => res.json())
      .then((data) => setPhotos(data));
  };

  useEffect(getAllPhotos, []);

  const getAlbumPhotos = () => {
    fetch(`/api/photos`)
      .then((response) => response.json())
      .then((data) => {
        setAlbumPhotos(
          data.filter((d) =>
            album.photos
              ? album.photos.includes(d.id)
              : console.log("album.photos can not find")
          )
        );
      });
  };

  const removePhoto = (id, getData) => {
    fetch(`/api/photos/${id}`, {
      method: "DELETE",
    }).then((res) =>
      res.status === 202 ? getData() : console.error(res.status)
    );
  };

  const addToAlbum = (id, idOfPhoto) => {
    const index = allAlbums.findIndex((a) => a.id === id);
    console.log(index);

    if (allAlbums[index].photos.includes(+idOfPhoto))
      return alert(`${allAlbums[index].name} already has the picture.`);

    fetch(`/api/albums/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        photos: [...allAlbums[index].photos, +idOfPhoto],
      }),
    }).then((res) =>
      res.status === 202 ? location.reload() : console.error(res.status)
    );
  };

  const likePhoto = (likeId) => {
    // const indexLike = like.findIndex((id) => id === likeId);
    // indexLike < 0 ? like.push(likeId) : like.splice(indexLike, 1);
    // setLike(like);

    const likedPhoto = photos.findIndex((p) => p.id === likeId);

    fetch(`/api/photos/${likeId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isLiked: !photos[likedPhoto].isLiked,
      }),
    }).then((res) =>
      res.status === 202 ? getAllPhotos() : console.error(res.status)
    );
  };

  const popover = (idOfPhoto) => {
    return (
      <Popover id="popover-basic">
        <Popover.Header as="h3">Albums</Popover.Header>
        <Popover.Body>
          {allAlbums.map((alb, i) => {
            return (
              <p
                className="popover-item"
                key={i}
                onClick={() => addToAlbum(alb.id, idOfPhoto)}
              >
                {alb.name}
              </p>
            );
          })}
        </Popover.Body>
      </Popover>
    );
  };

  return (
    <photoAppContext.Provider
      value={{
        getAllPhotos,
        getAlbumPhotos,
        photos,
        setPhotos,
        removePhoto,
        album,
        setAlbum,
        albumPhotos,
        setAlbumPhotos,
        allAlbums,
        popover,
        likePhoto,
        getAllAlbums,
      }}
    >
      {children}
    </photoAppContext.Provider>
  );
}
