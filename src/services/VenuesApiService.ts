import { API } from 'aws-amplify';
import ApiBaseUtilities from './ApiBaseUtilities';
import { Venue } from 'models/Venue';
import MissionsApiService from './MissionsApiService';
import produce from 'immer';

export default class VenuesApiService {
  constructor(
    private apiBase: ApiBaseUtilities,
    private missionsApi: MissionsApiService
  ) {}

  createVenue = async (venue: Venue) => {
    try {
      const venueDto = await produce(venue, async (draft) => {
        if (draft.uploadImgFile) {
          const imgUrlKey = await this.apiBase.uploadImage(draft.uploadImgFile);
          draft.imageUrl = imgUrlKey;
          delete draft.uploadImgFile;
        }
      });

      const result = await API.post('venues', '/venues', { body: venueDto });
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  updateVenue = async (venue: Venue) => {
    try {
      if (!venue.id) return null;

      const venueDto = await produce(venue, async (draft) => {
        if (draft.uploadImgFile) {
          const imgUrlKey = await this.apiBase.uploadImage(draft.uploadImgFile);
          draft.imageUrl = imgUrlKey;
          delete draft.uploadImgFile;
        }
      });

      const result = await API.put('venues', '/venues/' + venue.id, {
        body: venueDto,
      });
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  getAllVenues = async (): Promise<Venue[]> => {
    try {
      const result = await API.get('venues', '/venues', null);
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  getVenue = async (venueId: string): Promise<Venue> => {
    try {
      const result = await API.get('venues', '/venues/' + venueId, null);
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  deleteVenue = async (venue: Venue) => {
    try {
      if (!venue.id) return null;

      const missionsToDelete = await Promise.all(
        venue.missionIds.map((mId) => this.missionsApi.getMission(mId))
      );
      // Delete images first
      await Promise.all(
        missionsToDelete
          .filter((m) => m.imageUrl)
          .map((m) => this.apiBase.deleteImage(m.imageUrl))
      );
      // Delete missions
      await Promise.all(
        venue.missionIds.map((mId) => this.missionsApi.deleteMission(mId))
      );
      // Delete venue
      await API.del('venues', '/venues/' + venue.id, null);
    } catch (err) {
      console.log(err);
      return null;
    }
  };
}
