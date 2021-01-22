import { API } from 'aws-amplify';
import produce from 'immer';
import ApiBaseUtilities from './ApiBaseUtilities';
import { Mission } from 'models/Mission';

export default class MissionsApiService {
  constructor(private apiBase: ApiBaseUtilities) {}

  getMission = async (missionId: string): Promise<Mission> => {
    try {
      if (!missionId) return null;
      return await API.get('missions', '/missions/' + missionId, null);
    } catch (err) {
      console.log(err);
    }
  };

  createMissions = async (missions: Mission[]) => {
    try {
      // Automatically uploads images
      return await Promise.all(missions.map((c) => this.createMission(c)));
    } catch (err) {
      console.log(err);
    }
  };

  createMission = async (mission: Mission) => {
    try {
      const missionDto = await produce(mission, async (c) => {
        if (c.uploadImgFile) {
          const imgUrlKey = await this.apiBase.uploadImage(c.uploadImgFile);
          c.imageUrl = imgUrlKey;
          delete c.uploadImgFile;
        }
        // Remove options if the mission isnt mcq
        // Set mcq answer to 1 if its missing
        c.questions.forEach((qn) => {
          if (qn.type !== 'mcq') {
            delete qn.options;
          } else if (!qn.answer) {
            qn.answer = '1';
          }
        });
      });
      console.log(missionDto);
      if (missionDto.id) {
        return await API.put('missions', '/missions/' + missionDto.id, {
          body: missionDto,
        });
      } else {
        return await API.post('missions', '/missions', { body: missionDto });
      }
    } catch (err) {
      console.log(err);
    }
  };

  deleteMission = async (missionId: string) => {
    try {
      if (!missionId) return null;
      return await API.del('missions', '/missions/' + missionId, null);
    } catch (err) {
      console.log(err);
    }
  };
}
