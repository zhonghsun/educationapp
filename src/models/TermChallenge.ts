import { immerable } from 'immer';

export class TermChallenge {
  [immerable] = true;

  id: string;
  date: Date;
  uploadImgFile?: File;

  constructor(
    public title = '',
    public imageUrl: string = null,
    public topics: string[] = [],
    public challengeIds: string[] = []
  ) {}
}
