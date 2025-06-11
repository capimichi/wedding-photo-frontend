import React, { useState } from 'react';
import { useServices } from '../servicesContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';

const PhotoUpload: React.FC = () => {
  const { photoService } = useServices();
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validazione del file
    if (!file.type.startsWith('image/')) {
      setMessage('Seleziona un file immagine valido');
      return;
    }

    setUploading(true);
    setMessage('');
    setProgress(0);
    setShowProgress(true);

    try {
      await photoService.uploadPhoto(file, (progress) => {
        setProgress(progress);
      });
      
      setMessage('Foto caricata con successo!');
      
      // Reset del form
      event.target.value = '';
      
      // Nascondi la progress bar dopo 2 secondi e riabilita il bottone
      setTimeout(() => {
        setShowProgress(false);
        setProgress(0);
        setUploading(false);
      }, 2000);
    } catch (error) {
      setShowProgress(false);
      setMessage('Errore durante il caricamento. Riprova.');
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 p-8">
      <div className="text-center space-y-6 max-w-md">
        <img 
          src={logo} 
          alt="Logo" 
          className="w-36 h-36 rounded-full mx-auto mb-12 shadow-lg object-cover"
        />
        
        <h1 className="text-4xl md:text-5xl font-serif text-gray-800 mb-2">
          Ale & Gabri
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Carica la tua foto per gli sposi
        </p>
        
        <div className="upload-section flex items-center justify-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading}
            id="photo-input"
            className="hidden"
          />
          <label htmlFor="photo-input">
            <button 
              type="button" 
              disabled={uploading}
              onClick={() => document.getElementById('photo-input')?.click()}
              className="bg-pink-500 bg-gradient-to-r from-pink-400 to-purple-500 hover:bg-pink-600 hover:from-pink-500 hover:to-purple-600 disabled:bg-gray-400 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faCamera} />
              {uploading ? 'Caricamento...' : 'Carica'}
            </button>
          </label>
          
          <Link 
            to="/gallery" 
            className="text-lg font-semibold text-gray-600 hover:text-gray-800 transition-colors duration-300"
          >
            Gallery
          </Link>
        </div>

        {showProgress && (
          <div className="mt-6 w-full max-w-md">
            <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-pink-400 to-purple-500 h-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-center text-sm text-gray-600 mt-2">
              Caricamento... {progress}%
            </p>
          </div>
        )}

        {message && !showProgress && (
          <div className={`mt-6 p-4 rounded-lg text-center font-medium ${
            message.includes('successo') 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {message.includes('successo') ? (
              <span className="flex items-center justify-center gap-2">
                {message} <FontAwesomeIcon icon={faCheckCircle} />
              </span>
            ) : (
              message
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoUpload;
