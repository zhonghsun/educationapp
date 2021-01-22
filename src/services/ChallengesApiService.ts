import ApiBaseUtilities from './ApiBaseUtilities';
import { Challenge } from 'models/Challenge';
import { API } from 'aws-amplify';
import produce from 'immer';

export default class ChallengesApiService {
  constructor(private apiBase: ApiBaseUtilities) {}

  getChallenge = async (challengeId: string): Promise<Challenge> => {
    try {
      if (!challengeId) return null;
      return await API.get('challenges', '/challenges/' + challengeId, null);
    } catch (err) {
      console.log(err);
    }
  };

  createChallenges = async (challenges: Challenge[]) => {
    try {
      // Automatically uploads images
      return await Promise.all(challenges.map((c) => this.createChallenge(c)));
    } catch (err) {
      console.log(err);
    }
  };

  createChallenge = async (challenge: Challenge) => {
    try {
      const challengeDto = await produce(challenge, async (c) => {
        if (c.uploadImgFile) {
          const imgUrlKey = await this.apiBase.uploadImage(c.uploadImgFile);
          c.imageUrl = imgUrlKey;
          delete c.uploadImgFile;
        }
        // Remove options if the challenge isnt mcq
        // Set mcq answer to 1 if its missing
        c.questions.forEach((qn) => {
          if (qn.type !== 'mcq') {
            delete qn.options;
          } else if (!qn.answer) {
            qn.answer = '1';
          }
        });
      });
      console.log(challengeDto);
      if (challengeDto.id) {
        return await API.put('challenges', '/challenges/' + challengeDto.id, {
          body: challengeDto,
        });
      } else {
        return await API.post('challenges', '/challenges', { body: challengeDto });
      }
    } catch (err) {
      console.log(err);
    }
  };

  deleteChallenge = async (challengeId: string) => {
    try {
      if (!challengeId) return null;
      return await API.del('challenges', '/challenges/' + challengeId, null);
    } catch (err) {
      console.log(err);
    }
  };
}
