import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useServices } from '@/servicesContext';
import type Photo from '@/types/Photo';

const Gallery: React.FC = () => {
  const navigate = useNavigate();
  const { photoService } = useServices();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  const fetchPhotos = useCallback(async (page: number, append: boolean = false) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      
      const response = await photoService.getPhotos(page, 10);
      
      if (append) {
        setPhotos(prev => [...prev, ...response.photos]);
      } else {
        setPhotos(response.photos);
      }
      
      setCurrentPage(response.page);
      setTotalPages(response.total_pages);
      setIsComplete(response.page >= response.total_pages);
    } catch (err) {
      setError('Errore durante il caricamento delle foto');
      console.error('Error fetching photos:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [photoService]);

  useEffect(() => {
    fetchPhotos(1);
  }, [fetchPhotos]);

  const handleScroll = useCallback(() => {
    if (loadingMore || isComplete) return;

    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.documentElement.offsetHeight - 1000;

    if (scrollPosition >= threshold && currentPage < totalPages) {
      fetchPhotos(currentPage + 1, true);
    }
  }, [loadingMore, isComplete, currentPage, totalPages, fetchPhotos]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const goToPrevious = () => {
    setSelectedPhotoIndex(prev => 
      prev !== null ? (prev > 0 ? prev - 1 : photos.length - 1) : null
    );
  };

  const goToNext = () => {
    setSelectedPhotoIndex(prev => 
      prev !== null ? (prev < photos.length - 1 ? prev + 1 : 0) : null
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 p-8">
      <div className="w-full max-w-6xl">
        <div className="flex flex-col items-center mb-8">
          <button
            onClick={handleGoBack}
            className="flex items-center px-4 py-2 text-gray-600 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors mb-4 self-start"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Indietro
          </button>
          <h1 className="text-4xl md:text-5xl font-serif text-gray-800 text-center">
            Galleria Foto
          </h1>
        </div>

        <p className="text-lg text-gray-600 text-center mb-8">
          Tutte le foto condivise per Gabri & Ale
        </p>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-gray-500">Caricamento foto...</div>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center py-12">
            <div className="text-red-500">{error}</div>
          </div>
        )}

        {!loading && !error && photos.length === 0 && (
          <div className="flex justify-center items-center py-12">
            <div className="text-gray-500">Nessuna foto disponibile</div>
          </div>
        )}

        {!loading && !error && photos.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {photos.map((photo, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={photo.image_url}
                    alt={photo.image_name}
                    className="w-full h-64 object-cover"
                  />
                </div>
              ))}
            </div>

            {loadingMore && (
              <div className="flex justify-center items-center py-8">
                <div className="text-gray-500">Caricamento altre foto...</div>
              </div>
            )}

            {isComplete && (
              <div className="flex justify-center items-center py-8">
                <div className="text-gray-600 font-medium">Galleria completata</div>
              </div>
            )}
          </>
        )}

        {/* Lightbox */}
        {selectedPhotoIndex !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
            <div className="relative max-w-4xl max-h-4xl w-full h-full flex items-center justify-center p-4">
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Previous button */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next button */}
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Photo */}
              <img
                src={photos[selectedPhotoIndex].image_url}
                alt={photos[selectedPhotoIndex].image_name}
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Photo counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-3 py-1 rounded">
                {selectedPhotoIndex + 1} / {photos.length}
              </div>
            </div>

            {/* Click outside to close */}
            <div 
              className="absolute inset-0 -z-10" 
              onClick={closeLightbox}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
