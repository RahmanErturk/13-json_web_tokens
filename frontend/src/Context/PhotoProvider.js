import React from "react";
import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

import { useNavigate } from "react-router-dom";

import { Popover } from "react-bootstrap";

export const photoAppContext = createContext();

export default function PhotoProvider({ children }) {
  const [photos, setPhotos] = useState([]);
  const [album, setAlbum] = useState({});
  const [albumPhotos, setAlbumPhotos] = useState([]);
  const [allAlbums, setAllAlbums] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const loggedInCookie = Cookies.get("logged_in");

  const getAllAlbums = () => {
    try {
      fetch(`/api/albums`)
        .then((response) => response.json())
        .then((data) => setAllAlbums(data));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(getAllAlbums, []);

  const getAllPhotos = () => {
    // fetch("/api/photos") und beim package.json => proxy: "http://http://localhost:4001, am Ende npm run build "
    try {
      fetch("/api/photos")
        .then((res) => res.json())
        .then((data) => setPhotos(data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(getAllPhotos, []);

  const getAlbumPhotos = () => {
    fetch(`/api/photos`)
      .then((response) => response.json())
      .then((data) => {
        const albumPhotosID = album.photos?.map((a) => a._id);
        const albumPhotos = data.filter((d) => albumPhotosID?.includes(d._id));
        setAlbumPhotos(albumPhotos);
      });
  };

  const removePhoto = (id, getData) => {
    try {
      fetch(`/api/photos/${id}`, {
        method: "DELETE",
      }).then((res) => {
        res.status === 204 ? getData() : console.error(res.status);

        navigate("/photos");
      });
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromAlbum = (id) => {
    const indexOfPhoto = album.photos.findIndex((i) => i._id === id);
    const deletedAlbumPhotos = album.photos.splice(indexOfPhoto, 1);
    try {
      fetch(`/api/albums/${album._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          photos: [...album.photos],
        }),
      }).then((res) => {
        res.status === 201 ? getAlbumPhotos() : console.error(res.status);
        navigate(`/albums/${album._id}`);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addToAlbum = (id, idOfPhoto) => {
    const index = allAlbums.findIndex((a) => a._id === id);
    console.log(index);

    const albumPhotosID = allAlbums[index].photos.map((a) => a._id);
    if (albumPhotosID.includes(idOfPhoto))
      return alert(`${allAlbums[index].name} already has the picture.`);

    try {
      fetch(`/api/albums/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          photos: [...allAlbums[index].photos, idOfPhoto],
        }),
      }).then((res) =>
        res.status === 201 ? location.reload() : console.error(res.status)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = () => {
    try {
      fetch(`/api/auth/users/${loggedInCookie}`)
        .then((res) => res.json())
        .then((user) => setUser(user));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(getUser, []);

  const likePhoto = (likeId) => {
    const indexOfLikedPhoto = photos.findIndex((p) => p._id === likeId);
    const newLikedPhotos = [...user.likedPhotos, photos[indexOfLikedPhoto]._id];

    try {
      fetch(`/api/auth/users/${loggedInCookie}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          likedPhotos: newLikedPhotos,
        }),
      }).then((res) => {
        if (res.status === 201) {
          getUser();
          getAllPhotos();
        } else throw Error(res.status);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const dislikePhoto = (likeId) => {
    const photoIdIndex = user.likedPhotos.findIndex((p) => p === likeId);

    const newLikedPhotos = user.likedPhotos.splice(photoIdIndex, 1);

    try {
      fetch(`/api/auth/users/${loggedInCookie}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          likedPhotos: user.likedPhotos,
        }),
      }).then((res) =>
        res.status === 201 ? getAllPhotos() : console.error(res.status)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const popover = (idOfPhoto) => {
    return (
      <Popover id="popover-basic">
        <Popover.Header as="h3">Albums</Popover.Header>
        <Popover.Body>
          {allAlbums.map((album, i) => {
            return (
              <p
                className="popover-item"
                key={i}
                onClick={() => addToAlbum(album._id, idOfPhoto)}
              >
                {album.name}
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
        dislikePhoto,
        getAllAlbums,
        removeFromAlbum,
        loggedInUser,
        setLoggedInUser,
        loggedInCookie,
        user,
      }}
    >
      {children}
    </photoAppContext.Provider>
  );
}
