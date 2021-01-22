import React from "react";
import { Button } from "react-bootstrap";
import { useApiService } from "services/ApiService";
import { useRouteMatch, useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Venue } from "models/Venue";
import { Mission } from "models/Mission";
import LoadingIndicator from "components/LoadingIndicator";
import { Loading } from "models/LoadingStatus";
import "./ViewVenue.scss";
import Scaffold from "components/Scaffold/Scaffold";
import AppIcons from "components/AppIcons";
import TitleIcon from "components/TitleIcon";
import MissionItemContainer from "components/MissionViewUI/MissionItemContainer";
import MissionItemHeader from "components/MissionViewUI/MissionItemHeader";
import MissionQuestionsList from "components/MissionViewUI/MissionQuestionsList";
import MissionQuestionItem from "components/MissionViewUI/MissionQuestionItem";
import VenueDescriptionBox from "./components/VenueDescriptionBox";
import PageTitle from "components/PageTitle";

interface Props {}

const ViewVenue = (props: Props) => {
  const apiService = useApiService();
  const history = useHistory();
  const match = useRouteMatch<any>();
  const [missions, setMissions] = React.useState<Mission[]>(null);
  const [venue, setVenue] = React.useState<Venue>(null);
  const [loadingStatus, setLoadingStatus] = React.useState(Loading.GROUP);

  React.useEffect(() => {
    async function onLoad() {
      try {
        await new Promise((r) => setTimeout(r, 32));
        const venueResult = await apiService.venues.getVenue(match.params.id);
        setVenue(venueResult);
        setLoadingStatus(Loading.INDIVIDUAL);

        const missionsList = await Promise.all<Mission>(
          venueResult.missionIds.map((mId: string) => apiService.missions.getMission(mId))
        );
        setMissions(missionsList);
        setLoadingStatus(Loading.COMPLETE);
      } catch (e) {
        history.push("/venue");
        alert(e);
      }
    }

    onLoad();
  }, [match.params.id]);

  return (
    <Scaffold>
      <PageTitle>View Venue</PageTitle>
      {loadingStatus === Loading.GROUP && <LoadingIndicator className="align-self-center" />}
      {venue && (
        <>
          <div className="mt-4 d-flex align-items-center">
            <TitleIcon icon={AppIcons.rocket} />
            <h4 className="mb-0 ml-3">Venue Details</h4>
          </div>
          <VenueDescriptionBox venue={venue} />

          <div className="my-4 d-flex align-items-center">
            <TitleIcon icon={AppIcons.list} />
            <h4 className="mb-0 ml-3">Missions</h4>
          </div>
          {missions ? (
            <>
              {!missions.length ? <i>This venue does not have any missions.</i> : null}
              {missions.map((mission) => (
                <MissionItemContainer>
                  <MissionItemHeader imageUrl={mission.imageUrl} title={mission.title} date={mission.date} />
                  <MissionQuestionsList>
                    {mission.questions.map((qn, qnIdx) => (
                      <MissionQuestionItem question={qn} questionIndex={qnIdx} />
                    ))}
                  </MissionQuestionsList>
                </MissionItemContainer>
              ))}
            </>
          ) : (
            <LoadingIndicator className="align-self-center" />
          )}

          <div className="venue-edit-button">
            <Link to={`/venue/${match.params.id}/edit`}>
              <Button className="primary-button w-100 p-2">Edit Venue</Button>
            </Link>
          </div>
        </>
      )}
    </Scaffold>
  );
};

export default ViewVenue;
