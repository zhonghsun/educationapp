import { s3ImageUpload, s3Delete } from 'libs/awsLib';

export default class ApiBaseUtilities {
  POLL_LIMIT = 100;
  POLL_INTERVAL = 5000;

  uploadImage = async (imageFile: File) => {
    return await s3ImageUpload(imageFile);
  };

  deleteImage = async (imgKey: string) => {
    return await s3Delete(imgKey);
  };
}
