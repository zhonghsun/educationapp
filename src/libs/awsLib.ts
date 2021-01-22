import { Storage } from 'aws-amplify';
import Resizer from 'react-image-file-resizer';
import { v4 as uuidv4 } from 'uuid';
import config from 'config';

export const s3ImageUpload = async (imageFile: File): Promise<string> => {
  const blobUri = await new Promise<string>((resolve) => {
    Resizer.imageFileResizer(
      imageFile,
      800,
      800,
      'JPEG',
      85,
      0,
      (uri: string) => resolve(uri),
      'blob'
    );
  });

  const filename = uuidv4() + '.jpg';
  const resizedFile = new File([blobUri], filename);

  return await s3Upload(resizedFile);
};

export async function s3Upload(file: File, appendDate = false) {
  const filename = (appendDate ? `${Date.now()}-` : '') + file.name;

  const stored = (await Storage.put(filename, file, {
    contentType: file.type,
  })) as any;

  return stored.key;
}

export async function s3Delete(key: string) {
  const result = await Storage.remove(key);
  return result;
}

export const s3ImgBaseUrl = `https://${config.s3.BUCKET}.s3.${config.s3.REGION}.amazonaws.com/public/`;
