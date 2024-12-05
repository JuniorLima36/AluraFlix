import { BrowserRouter as Router } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiRequest } from './services/api';
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./routes";

export default function App() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const categoriasData = await apiRequest('categorias');
        setCategorias(categoriasData);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error.message);
      }
    }
    fetchCategorias();
  }, []);

  return (
    <Router>
      <Header />
      <AppRoutes 
        categorias={categorias} 
        selectedVideo={selectedVideo} 
        setSelectedVideo={setSelectedVideo} 
      />
      <Footer />
    </Router>
  );
}
