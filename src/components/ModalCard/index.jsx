import { useEffect, useReducer } from 'react';
import { apiRequest } from "../../services/api";
import { toast } from 'react-toastify';
import InputField from '../InputField/';
import SelectField from '../SelectField';
import TextAreaField from '../TextAreaField';
import PropTypes from 'prop-types';
import closeIcon from '../../assets/cancelar.png';
import styles from './ModalCard.module.css';

const initialFormState = {
  title: '',
  categoryId: '',
  image: '',
  video: '',
  description: ''
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return initialFormState;
    default:
      return state;
  }
};

ModalCard.propTypes = {
  onClose: PropTypes.func,
  selectedVideo: PropTypes.object,
  categorias: PropTypes.array,
};

export default function ModalCard({ onClose, selectedVideo, categorias }) {
  const [formData, dispatch] = useReducer(formReducer, initialFormState);

  useEffect(() => {
    if (selectedVideo) {
      dispatch({ type: 'UPDATE', field: 'title', value: selectedVideo.title || '' });
      dispatch({ type: 'UPDATE', field: 'categoryId', value: selectedVideo.categoryId || '' });
      dispatch({ type: 'UPDATE', field: 'image', value: selectedVideo.image || '' });
      dispatch({ type: 'UPDATE', field: 'video', value: selectedVideo.url || '' });
      dispatch({ type: 'UPDATE', field: 'description', value: selectedVideo.description || '' });
    }
  }, [selectedVideo]);

  const handleChange = (event) => {
    const { id, value } = event.target;
    dispatch({ type: 'UPDATE', field: id, value });
  };

  const resetForm = () => {
    dispatch({ type: 'RESET' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title || !formData.categoryId || !formData.video || !formData.description) {
      toast.warn('Por favor, preencha todos os campos obrigatórios!', { className: 'toast-warning' });
      return;
    }

    const dataToSend = {
      title: formData.title,
      categoryId: Number(formData.categoryId),
      image: formData.image,
      url: formData.video,
      description: formData.description,
    };

    try {
      const updatedVideo = await apiRequest(`videos/${selectedVideo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });
      toast.success('Vídeo atualizado com sucesso!', { className: 'toast-success' });
      onClose(updatedVideo);
    } catch {
      toast.error('Erro ao atualizar vídeo');
    }
  };
  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className={styles.overlayModal}>
      <section className={styles.coverModal} role="dialog" aria-modal="true">
        <form className={styles.formModal} onSubmit={handleSubmit}>
          <button className={styles.closeButtonModal} onClick={handleClose} aria-label="Fechar modal">
            <img src={closeIcon} alt="Fechar" />
          </button>
          <h2>EDITAR CARD:</h2>
          <InputField
            id="title"
            label="Título"
            value={formData.title}
            onChange={handleChange}
            placeholder="Digite seu título"
            className={styles.inputFieldModal}
          />
          <SelectField
            id="categoryId"
            label="Categoria"
            placeholder='Selecione uma categoria'
            value={String(formData.categoryId)}
            onChange={handleChange}
            options={categorias}
            className={styles.selectFieldModal}
          />
          <InputField
            id="image"
            label="Imagem"
            value={formData.image}
            onChange={handleChange}
            placeholder="Digite o link da imagem"
            className={styles.inputFieldModal}
          />
          <InputField
            id="video"
            label="Vídeo"
            value={formData.video}
            onChange={handleChange}
            placeholder="Digite o link do vídeo"
            className={styles.inputFieldModal}
          />
          <TextAreaField
            id="description"
            label="Descrição"
            value={formData.description}
            onChange={handleChange}
            placeholder="Digite a descrição do vídeo"
            className={styles.textAreaFieldModal}
          />
          <div className={styles.buttonsModal}>
            <button type="submit">SALVAR</button>
            <button type="reset" onClick={() => resetForm()}>LIMPAR</button>
          </div>
        </form>
      </section>
    </div>
  );
}
