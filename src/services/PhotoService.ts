import BackendClient from '@/clients/BackendClient';
import type AddPhotoRequest from '@/types/AddPhotoRequest';
import type AddPhotoResponse from '@/types/AddPhotoResponse';
import type Photo from '@/types/Photo';
import { fileToBase64 } from '@/utils/fileUtils';


export default class PhotoService {
  private client: BackendClient;

  constructor(client: BackendClient) {
    this.client = client;
  }

  async uploadPhoto(file: File): Promise<AddPhotoResponse> {
    // Convert file to base64
    const base64Content = await fileToBase64(file);
    
    // Create payload
    const payload: AddPhotoRequest = {
      image_content: base64Content,
      image_name: file.name
    };

    return this.client.uploadPhoto(payload);
  }

  async getPhotos(): Promise<Photo[]> {
    const response = await this.client.getPhotos();
    return response.photos;
  }
}
