import { Routes, Route } from "react-router-dom";
import PropTypes from 'prop-types';
import Banner from "./components/Banner";
import Cards from "./components/Cards";
import Register from "./components/Register";
import ModalCard from "./components/ModalCard";
import ErrorPage from "./components/ErrorPage";

AppRoutes.propTypes = {
  categorias: PropTypes.array.isRequired,
  selectedVideo: PropTypes.object,
  setSelectedVideo: PropTypes.func.isRequired,
};

export default function AppRoutes({ categorias, selectedVideo, setSelectedVideo }) {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <>
            <Banner selectedVideo={selectedVideo} categorias={categorias} />
            <Cards onSelectVideo={setSelectedVideo} categorias={categorias} />
          </>
        } 
      />
      <Route path="/novo-video" element={<Register />} />
      <Route path="/editar-video/:id" element={<ModalCard />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
