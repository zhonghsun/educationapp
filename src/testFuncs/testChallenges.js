import { API } from 'aws-amplify';

export const testChallenges = async () => {
  const testChallenge =
    '{"imageUrl":null,"title":"Testing your math","questions":[{"question":"What is 5 x 2?","type":"mcq","options":["12","5","0","9.999"],"answer":"12","hints":"5 and 2 are numbers."},{"question":"What is 1 x 1?","type":"mcq","options":["1","1","1","1"],"answer":"1","hints":"Just press any one lol. They are all correct"},{"question":"What is 10 x 1?","type":"mcq","options":["1","1","1","1"],"answer":"1","hints":"Just press any one lol. They are all correct"},{"question":"What is 1000 x 1?","type":"mcq","options":["1","1","1","1"],"answer":"1","hints":"Just press any one lol. They are all correct"}]}';
  const newUpdatedChallenge =
    '{"imageUrl":null,"title":"Testing your science","questions":[{"question":"Never gonna","type":"mcq","options":["Give you up","Let you down","Run around","Desert you"],"answer":"Give you up","hints":"???"},{"question":"KFC or MAC??","type":"mcq","options":["MOS","LJS","Wendys","NONE"],"answer":"NONE","hints":"Just press any one lol. They are all correct"},{"question":"fish or chicken??","type":"mcq","options":["pork","pork","chop","NONE"],"answer":"NONE","hints":"Just press any one lol. They are all correct"},{"question":"tiger or lion??","type":"mcq","options":["Merlion","singapore","malayisa","india"],"answer":"Merlion","hints":"Just press any one lol. They are all correct"}]}';

  console.log('=== TESTING MISSIONS SERVICE API ===');
  let result;
  let createdChallenge;
  result = await API.post('challenges', '/challenges', {
    body: JSON.parse(testChallenge)
  });
  createdChallenge = result;
  console.log('Can create');

  result = await API.get('challenges', '/challenges/' + createdChallenge.id);
  console.log('Can get', result.id);

  result = await API.get('challenges', '/challenges/');
  if (result.length === 0) throw 'No challenges retrieved!';
  console.log('Can get all', result.length);

  result = await API.put('challenges', '/challenges/' + createdChallenge.id, {
    body: JSON.parse(newUpdatedChallenge)
  });
  console.log('Can update', result);

  // await API.del('challenges', '/challenges/' + createdChallenge.id);
  // console.log('Can delete');
};
