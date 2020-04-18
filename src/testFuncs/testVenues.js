import { API } from "aws-amplify";

export const testVenues = async () => {
  const testVenue = {
    imageUrl: 'test image URL',
    title: 'Test Venue',
    background: 'Test Background',
    instructions: 'Test Instructions',
    topics: ['Topic 1', 'Topic 2', 'Topic 3'],
    missionIds: ['missionID1', 'missionID2', 'missionID3']
  };
  const testUpdatedVenue = {
    imageUrl: 'New image URL',
    title: 'New Venue',
    background: 'New Background',
    instructions: 'New Instructions',
    topics: ['New Topic 1', 'New Topic 2'],
    missionIds: ['New 1', 'New 2', 'New 3', 'New 4']
  };

  console.log('=== TESTING VENUES SERVICE API ===');
  let result;
  let createdVenue;
  result = await API.post('venues', '/venues', { body: testVenue });
  createdVenue = result;
  console.log('Can create');

  result = await API.get('venues', '/venues/' + createdVenue.id);
  console.log('Can get', result.id);

  result = await API.get('venues', '/venues/');
  if (result.length === 0) throw 'No venues retrieved!';
  console.log('Can get all', result.length);

  result = await API.put('venues', '/venues/' + createdVenue.id, {
    body: testUpdatedVenue
  });
  console.log('Can update', result);

  await API.del('venues', '/venues/' + createdVenue.id);
  console.log('Can delete');
};
