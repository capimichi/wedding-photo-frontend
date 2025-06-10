
import type AddPhotoResponse from '@/types/AddPhotoResponse';
import type GetPhotosResponse from '@/types/GetPhotosResponse';

// Placeholder BackendClient


export default class BackendClient {
  private backendUrl: string;

  constructor(backendUrl: string) {
    this.backendUrl = backendUrl;
  }

  async uploadPhoto(file: File, onProgress?: (progress: number) => void): Promise<AddPhotoResponse> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      
      formData.append('image', file);
      formData.append('image_name', file.name);

      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable && onProgress) {
          const progress = Math.round((event.loaded / event.total) * 100);
          onProgress(progress);
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch (error) {
            reject(new Error('Errore durante il parsing della risposta'));
          }
        } else {
          reject(new Error('Errore durante il caricamento della foto'));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Errore di rete durante il caricamento'));
      });

      xhr.open('POST', `${this.backendUrl}/api/photos`);
      xhr.send(formData);
    });
  }

  async getPhotos(page: number = 1, perPage: number = 10): Promise<GetPhotosResponse> {
    const response = await fetch(`${this.backendUrl}/api/photos?page=${page}&per_page=${perPage}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Errore durante il recupero delle foto');
    }

    return response.json();
  }
}
