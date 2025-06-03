// Placeholder BackendClient


export default class BackendClient {
  private backendUrl: string;

  constructor(backendUrl: string) {
    this.backendUrl = backendUrl;
  }

  async uploadPhoto(file: File): Promise<void> {
    const formData = new FormData();
    formData.append('photo', file);

    const response = await fetch(`${this.backendUrl}/photos/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Errore durante il caricamento della foto');
    }
  }
}
