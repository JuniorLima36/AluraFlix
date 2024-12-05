import { useState } from 'react';

export function useModal() {
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const openModal = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
  };

  const closeModal = (updatedVideo, setVideos) => {
    if (updatedVideo) {
      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video.id === updatedVideo.id ? updatedVideo : video
        )
      );
    }
    setShowModal(false);
    setSelectedVideo(null);
  };

  return { showModal, selectedVideo, openModal, closeModal };
}
