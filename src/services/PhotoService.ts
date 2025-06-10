import BackendClient from '@/clients/BackendClient';

import type AddPhotoResponse from '@/types/AddPhotoResponse';
import type GetPhotosResponse from '@/types/GetPhotosResponse';


export default class PhotoService {
  private client: BackendClient;

  constructor(client: BackendClient) {
    this.client = client;
  }

  async uploadPhoto(file: File, onProgress?: (progress: number) => void): Promise<AddPhotoResponse> {
    return this.client.uploadPhoto(file, onProgress);
  }

  async getPhotos(page: number = 1, perPage: number = 10): Promise<GetPhotosResponse> {
    return this.client.getPhotos(page, perPage);
  }
}
