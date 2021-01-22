import { immerable } from 'immer';

export class Question {
  [immerable] = true;

  constructor(
    public question = '',
    public type = 'mcq',
    public hints = '',
    /** Number when MCQ index, string when free text. MCQ option will be converted to string when submitting */
    public answer: number | string = '',
    public options: string[] = []
  ) {}
}
