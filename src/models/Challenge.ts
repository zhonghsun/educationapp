import { immerable } from 'immer';
import { Question } from './Question';

export class Challenge {
  [immerable] = true;

  id: string;
  date: Date;
  uploadImgFile: File;

  constructor(
    public title = '',
    public imageUrl = '',
    public questions: Question[] = []
  ) {}
}
