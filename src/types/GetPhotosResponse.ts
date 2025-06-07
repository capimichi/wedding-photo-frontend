import type Photo from './Photo';

export default interface GetPhotosResponse {
  photos: Photo[];
  page: number;
  total_pages: number;
}
