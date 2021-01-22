import { immerable } from 'immer';

export class Venue {
  [immerable] = true;

  id: string;
  date: Date;
  uploadImgFile?: File;

  constructor(
    public title = '',
    public imageUrl: string = null,
    public topics: string[] = [],
    public background = '',
    public instructions = '',
    public missionIds: string[] = []
  ) {}
}
