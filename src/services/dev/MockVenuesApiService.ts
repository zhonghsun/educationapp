import { Venue } from "models/Venue";
import VenuesApiService from "services/VenuesApiService";

export default class MockVenuesApiService extends VenuesApiService {
  getAllVenues = async () => {
    return JSON.parse(
      `[{"instructions":"Instructions is instructions 3443434","background":"Background is background 234","date":1592338195164,"imageUrl":"5dc6ca66-795a-4049-985c-403bede4d577.jpg","missionIds":["57017c40-b00d-11ea-8514-5da1a7bda7b5","5719bf30-b00d-11ea-9735-ab218e09894b"],"id":"585af1c0-b00d-11ea-adaa-f1acfabb4f67","topics":["Topic 1"],"title":"Venue 1"},{"instructions":"Instructions is instructions 3443434","background":"Background is background 234","date":1592338195164,"imageUrl":"5dc6ca66-795a-4049-985c-403bede4d577.jpg","missionIds":["57017c40-b00d-11ea-8514-5da1a7bda7b5","5719bf30-b00d-11ea-9735-ab218e09894b"],"id":"585af1c0-cccc-cccc-cccc-f1acfbb4f67","topics":["Topic 1"],"title":"Venue 1"}]`
    );
  };

  getVenue = async (venueId: string) => {
    const newVenue = JSON.parse(
      `{"instructions":"Instructions is instructions 3443434","background":"Background is background 234","date":1592338195164,"imageUrl":"5dc6ca66-795a-4049-985c-403bede4d577.jpg","missionIds":["57017c40-b00d-11ea-8514-5da1a7bda7b5","5719bf30-b00d-11ea-9735-ab218e09894b"],"id":"585af1c0-b00d-11ea-adaa-f1acfabb4f67","topics":["Topic 1"],"title":"Venue 1"}`
    );

    newVenue.id = venueId;
    return newVenue;
  };

  updateVenue = async (venue: Venue) => {
    return true;
  };
}
