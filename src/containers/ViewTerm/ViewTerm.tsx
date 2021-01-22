import React from "react";
import { Button } from "react-bootstrap";
import { useApiService } from "services/ApiService";
import { useRouteMatch, useHistory } from "react-router";
import { Link } from "react-router-dom";
import { TermChallenge } from "models/TermChallenge";
import { Challenge } from "models/Challenge";
import LoadingIndicator from "components/LoadingIndicator";
import { Loading } from "models/LoadingStatus";
import Scaffold from "components/Scaffold/Scaffold";
import MissionItemContainer from "components/MissionViewUI/MissionItemContainer";
import MissionItemHeader from "components/MissionViewUI/MissionItemHeader";
import MissionQuestionItem from "components/MissionViewUI/MissionQuestionItem";
import MissionQuestionsList from "components/MissionViewUI/MissionQuestionsList";
import "./ViewTerm.scss";
import TermDescriptionBox from "./components/TermDescriptionBox";
import TitleIcon from "components/TitleIcon";
import AppIcons from "components/AppIcons";
import PageTitle from "components/PageTitle";

interface Props {}

const ViewTerm = (props: Props) => {
  const apiService = useApiService();
  const history = useHistory();
  const match = useRouteMatch<any>();
  const [challenges, setChallenges] = React.useState<Challenge[]>(null);
  const [term, setTerm] = React.useState<TermChallenge>(null);
  const [loadingStatus, setLoadingStatus] = React.useState(Loading.GROUP);

  React.useEffect(() => {
    async function onLoad() {
      try {
        await new Promise((r) => setTimeout(r, 32));
        const term = await apiService.terms.getTerm(match.params.id);
        setTerm(term);
        setLoadingStatus(Loading.INDIVIDUAL);

        const challengesList = await Promise.all<Challenge>(
          term.challengeIds.map((cId) => apiService.challenges.getChallenge(cId))
        );

        setChallenges(challengesList);
        setLoadingStatus(Loading.COMPLETE);
      } catch (e) {
        history.push("/challenge");
        alert(e);
      }
    }

    onLoad();
  }, [match.params.id]);

  return (
    <Scaffold>
      <PageTitle>View Term Challenge</PageTitle>
      {loadingStatus === Loading.GROUP && <LoadingIndicator className="align-self-center" />}
      {term && (
        <>
          <div className="mt-4 d-flex align-items-center">
            <TitleIcon icon={AppIcons.rocket} />
            <h4 className="mb-0 ml-3">Term Details</h4>
          </div>
          <TermDescriptionBox term={term} />
          <div className="my-4 d-flex align-items-center">
            <TitleIcon icon={AppIcons.list} />
            <h4 className="mb-0 ml-3">Individual Challenges</h4>
          </div>
          {challenges ? (
            <>
              {!challenges.length ? <i>This term does not have any individual challenges.</i> : null}
              {challenges.map((challenge) => (
                <MissionItemContainer>
                  <MissionItemHeader
                    imageUrl={challenge.imageUrl}
                    title={challenge.title}
                    date={challenge.date}
                  />
                  <MissionQuestionsList>
                    {challenge.questions.map((qn, qnIdx) => (
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
            <Link to={`/challenge/${match.params.id}/edit`}>
              <Button className="primary-button w-100 p-2">Edit Term Challenge</Button>
            </Link>
          </div>
        </>
      )}
    </Scaffold>
  );
};

export default ViewTerm;
