import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { apiRequest } from '../services/api';
import { useLoading } from './useLoading';

export function useVideosAndCategories() {
  const [categorias, setCategorias] = useState([]);
  const [videos, setVideos] = useState([]);
  const { loading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    async function fetchData() {
      startLoading();
      try {
        const [categoriasData, videosData] = await Promise.all([
          apiRequest('categorias'),
          apiRequest('videos'),
        ]);
        setCategorias(categoriasData);
        setVideos(videosData);
      } catch {
        toast.error('Erro ao buscar dados');
      } finally {
        stopLoading();
      }
    }

    fetchData();
  }, []);

  return { categorias, videos, setVideos, loading };
}
