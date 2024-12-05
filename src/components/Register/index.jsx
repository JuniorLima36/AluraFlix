import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFetchCategories } from '../../hooks/useFetchCategories';
import InputField from '../InputField';
import SelectField from '../SelectField';
import TextAreaField from '../TextAreaField';
import { apiRequest } from '../../services/api';
import styles from './Register.module.css';

export default function Register() {
  const [formData, setFormData] = useState({
    title: '',
    categoryId: '',
    image: '',
    video: '',
    description: '',
  });

  const { categories, loading } = useFetchCategories();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      categoryId: '',
      image: '',
      video: '',
      description: '',
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { title, categoryId, video, description, image } = formData;

    if (!title || !categoryId || !video || !description) {
      toast.warn('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    const videoId = video.split('v=')[1];
    const imageUrl = image || `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;

    try {
      await apiRequest('videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          categoryId: Number(categoryId),
          url: video,
          description,
          image: imageUrl,
        }),
      });
      toast.success('Vídeo cadastrado com sucesso!', { className: 'toast-success' });
      navigate('/');
    } catch {
      toast.error('Erro ao salvar vídeo');
    }
  };

  if (loading) {
    return <p>Carregando categorias...</p>;
  }

  return (
    <section className={styles.form}>
      <section className={styles.formHeader}>
        <h2>NOVO VÍDEO</h2>
        <p>Complete o formulário para criar um novo vídeo</p>
      </section>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h2>Criar Vídeo</h2>
        <div className={styles.formInputs}>
          <InputField
            label="Título"
            id="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Digite o título do vídeo"
          />
          <SelectField
            label="Categoria"
            id="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            options={categories}
            placeholder="Selecione uma categoria"
          />
        </div>
        <div className={styles.formInputs}>
          <InputField
            label="Imagem"
            id="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Digite o link da imagem"
          />
          <InputField
            label="Vídeo"
            id="video"
            value={formData.video}
            onChange={handleChange}
            placeholder="Digite o link do vídeo"
          />
        </div>
        <TextAreaField
          label="Descrição"
          id="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Digite a descrição do vídeo"
        />
        <div className={styles.buttons}>
          <button type="submit">SALVAR</button>
          <button type="reset" onClick={resetForm}>LIMPAR</button>
        </div>
      </form>
    </section>
  );
}
