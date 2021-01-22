import { immerable } from 'immer';
import { Question } from './Question';
import { Challenge } from './Challenge';

export class Mission extends Challenge {}

// export class Mission {
//   [immerable] = true;

//   id: string;
//   date: Date;
//   uploadImgFile: File;

//   constructor(
//     public title = '',
//     public imageUrl = '',
//     public questions: Question[] = []
//   ) {}
// }
