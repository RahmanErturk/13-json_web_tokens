import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./compontents/Navbar";
import Main from "./views/Main";
import Photo from "./views/Photo";
import LocalAlbum from "./views/LocalAlbum";
import AlbumsOverview from "./views/AlbumsOverview";
import PhotosOverview from "./views/PhotosOverview";
import PhotoProvider from "./Context/PhotoProvider";
import LocalAlbumPhoto from "./views/LocalAlbumPhoto";
import UserAlbumPhoto from "./views/UserAlbumPhoto";
import LikedPhotos from "./views/LikedPhotos";
import Register from "./views/Register";
import Login from "./views/Login";
import "./styles/main.scss";
import UserAlbum from "./views/UserAlbum";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <PhotoProvider>
          <Navbar />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Main />} />
            <Route path="/photos/:photoId" element={<Photo />} />
            <Route path="/photos" element={<PhotosOverview />} />
            <Route path="/albums/:albumId" element={<LocalAlbum />} />
            <Route
              path="/users/:userId/albums/:albumId"
              element={<UserAlbum />}
            />
            <Route path="/albums/" element={<AlbumsOverview />} />
            <Route
              path="/albums/:albumId/photos/:photoId"
              element={<LocalAlbumPhoto />}
            />
            <Route
              path="users/:userId/albums/:albumId/photos/:photoId"
              element={<UserAlbumPhoto />}
            />
            <Route path="/liked-photos" element={<LikedPhotos />} />
          </Routes>
        </PhotoProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
