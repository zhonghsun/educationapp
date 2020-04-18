import { immerable } from 'immer';

export class Challenge {
  [immerable] = true;

  id;
  date;

  constructor(title = '', imageUrl = '', questions = []) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.questions = questions;
  }
}

export class TermChallenge {
  [immerable] = true;

  id;
  date;

  constructor(title = '', topics = [], challengeIds = []) {
    this.title = title;
    this.topics = topics;
    this.challengeIds = challengeIds;
  }
}
