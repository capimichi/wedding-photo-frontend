import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import BackendClient from './clients/BackendClient';
import PhotoService from './services/PhotoService';

// Definizione dell'interfaccia per il contesto dei servizi
interface ServicesContextType {
  photoService: PhotoService;
}

// Creazione del contesto React
const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

// Provider component per rendere disponibili i servizi
interface ServicesProviderProps {
  children: ReactNode;
}

export const ServicesProvider: React.FC<ServicesProviderProps> = ({
  children
}) => {
    const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;

    // Inizializzazione dei client e dei servizi
    const backendClient = new BackendClient(backendUrl);
    const photoService = new PhotoService(backendClient);
    
    const services: ServicesContextType = {
        photoService: photoService
    };

    return (
        <ServicesContext.Provider value={services}>
        {children}
        </ServicesContext.Provider>
    );
};

// Hook personalizzato per utilizzare i servizi
export const useServices = (): ServicesContextType => {
  const context = useContext(ServicesContext);
  if (context === undefined) {
    throw new Error('useServices deve essere utilizzato all\'interno di un ServicesProvider');
  }
  return context;
};