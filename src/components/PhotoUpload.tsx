import React, { useState } from 'react';
import { useServices } from '../servicesContext';

const PhotoUpload: React.FC = () => {
  const { photoService } = useServices();
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string>('');

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

    try {
      await photoService.uploadPhoto(file);
      setMessage('Foto caricata con successo! 🎉');
      // Reset del form
      event.target.value = '';
    } catch (error) {
      setMessage('Errore durante il caricamento. Riprova.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 p-8">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-4xl md:text-5xl font-serif text-gray-800 mb-2">
          Gabri & Ale
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Carica la tua foto per gli sposi
        </p>
        
        <div className="upload-section">
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
              className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:cursor-not-allowed cursor-pointer"
            >
              {uploading ? 'Caricamento...' : 'Carica'}
            </button>
          </label>
        </div>

        {message && (
          <div className={`mt-6 p-4 rounded-lg text-center font-medium ${
            message.includes('successo') 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoUpload;
