import BackendClient from '@/clients/BackendClient';


export default class PhotoService {
  private client: BackendClient;

  constructor(client: BackendClient) {
    this.client = client;
  }

  async uploadPhoto(file: File): Promise<void> {
    return this.client.uploadPhoto(file);
  }
}
