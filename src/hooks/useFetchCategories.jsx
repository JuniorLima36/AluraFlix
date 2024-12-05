import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { apiRequest } from '../services/api';

export function useFetchCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await apiRequest('categorias');
        setCategories(data);
      } catch {
        toast.error('Erro ao buscar categorias');
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return { categories, loading };
}
