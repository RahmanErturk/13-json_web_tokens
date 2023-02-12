import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./compontents/Navbar";
import Main from "./views/Main";
import Photo from "./views/Photo";
import Album from "./views/Album";
import AlbumsOverview from "./views/AlbumsOverview";
import PhotosOverview from "./views/PhotosOverview";
import PhotoProvider from "./Context/PhotoProvider";
import AlbumPhoto from "./views/AlbumPhoto";
import LikedPhotos from "./views/LikedPhotos";
import Register from "./views/Register";
import Login from "./views/Login";
import "./styles/main.scss";

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
            <Route path="/albums/:albumId" element={<Album />} />
            <Route path="/albums/" element={<AlbumsOverview />} />
            <Route
              path="/albums/:albumId/photo/:photoId"
              element={<AlbumPhoto />}
            />
            <Route path="/liked-photos" element={<LikedPhotos />} />
          </Routes>
        </PhotoProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
