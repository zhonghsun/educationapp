import { API } from "aws-amplify";

export const testTerms = async () => {
  const testTerm = '{"id":"term1","title":"Term 1","challengeIds":["t1c1","t1c2"]}';
  const newUpdatedTerm =
    '{"id":"term2","title":"Term 2","challengeIds":["t2c1","t2c2"]}';

  console.log('=== TESTING TERMS SERVICE API ===');
  let result;
  let createdTerm;
  result = await API.post('terms', '/terms', {
    body: JSON.parse(testTerm)
  });
  createdTerm = result;
  console.log('Can create');

  result = await API.get('terms', '/terms/' + createdTerm.id);
  console.log('Can get', result.id);

  result = await API.get('terms', '/terms/');
  if (result.length === 0) throw 'No terms retrieved!';
  console.log('Can get all', result.length);

  result = await API.put('terms', '/terms/' + createdTerm.id, {
    body: JSON.parse(newUpdatedTerm)
  });
  console.log('Can update', result);

  await API.del('terms', '/terms/' + createdTerm.id);
  console.log('Can delete');
};
