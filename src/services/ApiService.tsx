import React from 'react';
import ApiBaseUtilities from './ApiBaseUtilities';
import MissionsApiService from './MissionsApiService';
import UsersApiService from './UsersApiService';
import VenuesApiService from './VenuesApiService';
import ChallengesApiService from './ChallengesApiService';
import TermsApiService from './TermsApiService';
import MockVenuesApiService from './dev/MockVenuesApiService';
import MockMissionsApiService from './dev/MockMissionsApiService';
import MockTermsApiService from './dev/MockTermsApiService';
import MockChallengesApiService from './dev/MockChallengesApiService';

class ApiService {
  private baseUtils = new ApiBaseUtilities();

  missions = new MissionsApiService(this.baseUtils);
  venues = new VenuesApiService(this.baseUtils, this.missions);
  challenges = new ChallengesApiService(this.baseUtils);
  terms = new TermsApiService(this.baseUtils, this.challenges);
  users = new UsersApiService(this.baseUtils);
}

class MockApiService {
  private baseUtils = new ApiBaseUtilities();

  missions = new MockMissionsApiService(this.baseUtils);
  venues = new MockVenuesApiService(this.baseUtils, this.missions);
  challenges = new MockChallengesApiService(this.baseUtils);
  terms = new MockTermsApiService(this.baseUtils, this.challenges);
  users = new UsersApiService(this.baseUtils);
}

const apiService = new ApiService();

// CONTEXT RELATED

const ApiContext = React.createContext(apiService);

export const ApiProvider = (props) => {
  return <ApiContext.Provider value={apiService} {...props} />;
};

export const useApiService = () => {
  return React.useContext(ApiContext);
};


