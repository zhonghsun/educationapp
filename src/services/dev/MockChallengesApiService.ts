import ChallengesApiService from "services/ChallengesApiService";

const makeMeAChallenge = (id?: string) => {
  const newChallenge = JSON.parse(`
    {"date":1592329006966,"questions":[{"question":"55555","type":"text","answer":"5555555555555","hints":"5555555"}],"imageUrl":"","id":"f3c33160-aff7-11ea-af70-f901dea5743f","title":"55"}`);
  if (id) {
    newChallenge.id = id;
  }
  return newChallenge;
};

export default class MockChallengesApiService extends ChallengesApiService {
  getChallenge = async (challengeId: string) => {
    return makeMeAChallenge(challengeId);
  };
}
