import { API } from 'aws-amplify';
import ApiBaseUtilities from './ApiBaseUtilities';
import { TermChallenge } from 'models/TermChallenge';
import ChallengesApiService from './ChallengesApiService';

export default class TermsApiService {
  constructor(
    private apiBase: ApiBaseUtilities,
    private challengesApi: ChallengesApiService
  ) {}

  createTerm = async (term: TermChallenge) => {
    try {
      const result = await API.post('terms', '/terms', { body: term });
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  updateTerm = async (term: TermChallenge) => {
    try {
      if (!term.id) return null;
      const result = await API.put('terms', '/terms/' + term.id, { body: term });
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  getAllTerms = async (): Promise<TermChallenge[]> => {
    try {
      const result = await API.get('terms', '/terms', null);
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  getTerm = async (termId: string): Promise<TermChallenge> => {
    try {
      if (!termId) return null;
      const result = await API.get('terms', '/terms/' + termId, null);
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  deleteTerm = async (term: TermChallenge) => {
    try {
      if (!term.id) return null;
      // Obtain challenges
      const challenges = await Promise.all(
        term.challengeIds.map((cId) => this.challengesApi.getChallenge(cId))
      );
      // Delete images first
      await Promise.all(
        challenges
          .filter((c) => c.imageUrl)
          .map((c) => this.apiBase.deleteImage(c.imageUrl))
      );
      // Delete challenges
      await Promise.all(
        term.challengeIds.map((cId) => this.challengesApi.deleteChallenge(cId))
      );
      // Delete term
      await API.del('terms', '/terms/' + term.id, null);
    } catch (err) {
      console.log(err);
      return null;
    }
  };
}
