import { TermChallenge } from "models/TermChallenge";
import TermsApiService from "services/TermsApiService";

const makeMeATerm = (id?: string) => {
  const newTerm = JSON.parse(
    `{"date":1592327335998,"imageUrl":null,"challengeIds":["bcd1cb30-aff7-11ea-af70-f901dea5743f","f3c33160-aff7-11ea-af70-f901dea5743f"],"id":"0fc9b5e0-aff4-11ea-bb5e-b123b56966bf","topics":["Topic 1"],"title":"Term 2"}`
  );
  if (id) {
    newTerm.id = id;
  }
  return newTerm;
};

export default class MockTermsApiService extends TermsApiService {
  createTerm = async (term: TermChallenge) => {
    return term;
  };

  updateTerm = async (term: TermChallenge) => {
    return term;
  };

  getAllTerms = async (): Promise<TermChallenge[]> => {
    return [...Array(4)].map(() => makeMeATerm(Math.random().toString().slice(2)));
  };

  getTerm = async (termId: string): Promise<TermChallenge> => {
    return makeMeATerm(termId);
  };

  deleteTerm = async (term: TermChallenge) => {
    return true;
  };
}
