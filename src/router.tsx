import { createHashRouter } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import GalleryPage from '@/pages/GalleryPage';

export const router = createHashRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/gallery',
    element: <GalleryPage />,
  },
]);
