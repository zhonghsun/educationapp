import { Mission } from "models/Mission";
import MissionsApiService from "services/MissionsApiService";

export default class MockMissionsApiService extends MissionsApiService {
  getMission = async (missionId: string): Promise<Mission> => {
    if (!missionId) return null;
    const mission = JSON.parse(
      `{"date":1592338193060,"imageUrl":"c6269782-2b0e-4b6f-a5df-9f9db1e342e4.jpg","questions":[{"question":"45665","type":"text","answer":"7878","hints":"677"}],"id":"5719bf30-b00d-11ea-9735-ab218e09894b","title":"5555"}`
    );
    mission.id = missionId;
    mission.name = "Mission " + Math.random().toString().slice(2);
    return mission;
  };

  deleteMission = async (missionId: string) => {
    return true;
  };
}
