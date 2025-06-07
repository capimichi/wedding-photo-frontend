import type AddPhotoRequest from '@/types/AddPhotoRequest';
import type AddPhotoResponse from '@/types/AddPhotoResponse';
import type GetPhotosResponse from '@/types/GetPhotosResponse';

// Placeholder BackendClient


export default class BackendClient {
  private backendUrl: string;

  constructor(backendUrl: string) {
    this.backendUrl = backendUrl;
  }

  async uploadPhoto(payload: AddPhotoRequest): Promise<AddPhotoResponse> {
    const response = await fetch(`${this.backendUrl}/api/photos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Errore durante il caricamento della foto');
    }

    return response.json();
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
