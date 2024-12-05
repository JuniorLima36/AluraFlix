import { useVideosAndCategories } from '../../hooks/useVideosAndCategories';
import { useModal } from '../../hooks/useModal';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import styles from './Cards.module.css';
import trash from '../../assets/excluir.png';
import edit from '../../assets/editar.png';
import ModalCard from '../ModalCard';
import Loading from '../Loading';
import { apiRequest } from '../../services/api';
import SliderComponent from '../Slider';

Cards.propTypes = {
  onSelectVideo: PropTypes.func.isRequired,
};

export default function Cards({ onSelectVideo }) {
  const { categorias, videos, setVideos, loading } = useVideosAndCategories();
  const { showModal, selectedVideo, openModal, closeModal } = useModal();

  const handleDelete = async (videoId) => {
    try {
      await apiRequest(`videos/${videoId}`, { method: 'DELETE' });
      toast.success('Vídeo excluído com sucesso!', { className: 'toast-success' });
      setVideos((prevVideos) => prevVideos.filter((video) => video.id !== videoId));
    } catch {
      toast.error('Erro ao excluir vídeo');
    }
  };

  if (loading) {
    return <Loading cardCount={3} skeletonCount={4} />;
  }

  return (
    <section className={styles.containerCards}>
      {categorias.map((categoria) => (
        <section className={styles.containerCategory} key={categoria.id}>
          <h2 style={{ backgroundColor: categoria.color }}>{categoria.title}</h2>
          <SliderComponent categoria={categoria}>
            {videos
              .filter((video) => video.categoryId === categoria.id)
              .map((video) => (
                <section
                  key={video.id}
                  className={styles.card}
                  onClick={() => onSelectVideo(video)}
                >
                  <div
                    className={styles.cardEffect}
                    style={{
                      borderColor: categoria.color,
                      boxShadow: `0px 0px 17px 8px inset ${categoria.shadowColor}`,
                      background: `url(${
                        video.image ||
                        `https://img.youtube.com/vi/${
                          video.url.split('v=')[1]
                        }/sddefault.jpg`
                      }) no-repeat center center / cover`,
                    }}
                  ></div>
                  <div className={styles.buttons}
                    style={{
                      borderColor: categoria.color,
                      boxShadow: `0px 0px 17px 8px inset ${categoria.shadowColor}`,
                    }}
                  >
                    <button
                      className={styles.button}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(video.id);
                      }}
                    >
                      <img src={trash} alt="deletar" />
                      DELETAR
                    </button>
                    <button
                      className={styles.button}
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(video);
                      }}
                    >
                      <img src={edit} alt="editar" />
                      EDITAR
                    </button>
                  </div>
                </section>
              ))}
          </SliderComponent>
        </section>
      ))}

      {showModal && (
        <ModalCard
          onClose={(updatedVideo) => closeModal(updatedVideo, setVideos)}
          selectedVideo={selectedVideo}
          categorias={categorias}
        />
      )}
    </section>
  );
}
