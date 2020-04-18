import { API } from "aws-amplify";

export const testMissions = async () => {
  const testMission =
    '{"imageUrl":null,"title":"Stealing a plane","questions":[{"question":"What is 5 x 2?","type":"mcq","options":["12","5","0","9.999"],"answer":"12","hints":"5 and 2 are numbers."},{"question":"What is 1 x 1?","type":"mcq","options":["1","1","1","1"],"answer":"1","hints":"Just press any one lol. They are all correct"},{"question":"What is 10 x 1?","type":"mcq","options":["1","1","1","1"],"answer":"1","hints":"Just press any one lol. They are all correct"},{"question":"What is 1000 x 1?","type":"mcq","options":["1","1","1","1"],"answer":"1","hints":"Just press any one lol. They are all correct"}]}';
  const newUpdatedMission =
    '{"title":"Flying off to escape school","questions":[{"question":"Never gonna","type":"mcq","options":["Give you up","Let you down","Run around","Desert you"],"answer":"Give you up","hints":"???"},{"question":"KFC or MAC??","type":"mcq","options":["MOS","LJS","Wendys","NONE"],"answer":"NONE","hints":"Just press any one lol. They are all correct"},{"question":"fish or chicken??","type":"mcq","options":["pork","pork","chop","NONE"],"answer":"NONE","hints":"Just press any one lol. They are all correct"},{"question":"tiger or lion??","type":"mcq","options":["Merlion","singapore","malayisa","india"],"answer":"Merlion","hints":"Just press any one lol. They are all correct"}]}';

  console.log('=== TESTING MISSIONS SERVICE API ===');
  let result;
  let createdMission;
  result = await API.post('missions', '/missions', {
    body: JSON.parse(testMission)
  });
  createdMission = result;
  console.log('Can create');

  result = await API.get('missions', '/missions/' + createdMission.id);
  console.log('Can get', result.id);

  result = await API.get('missions', '/missions/');
  if (result.length === 0) throw 'No missions retrieved!';
  console.log('Can get all', result.length);

  result = await API.put('missions', '/missions/' + createdMission.id, {
    body: JSON.parse(newUpdatedMission)
  });
  console.log('Can update', result);

  await API.del('missions', '/missions/' + createdMission.id);
  console.log('Can delete');
};
