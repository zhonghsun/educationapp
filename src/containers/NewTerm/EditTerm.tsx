import React, { useState } from "react";
import { Form } from "react-bootstrap";
import LoaderButton from "components/LoaderButton";
import "./NewTerm.css";
import { TermChallenge } from "models/TermChallenge";
import produce from "immer";
import { isValued } from "utils/objectUtils";
import IndivChallenges from "components/IndivChallenges";
import { useApiService } from "services/ApiService";
import { Challenge } from "models/Challenge";
import TopicsList from "components/TopicsList/TopicsList";
import { useRouteMatch } from "react-router";
import { Loading } from "models/LoadingStatus";
import LoadingIndicator from "components/LoadingIndicator";
import FileDropInput from "components/FileDropInput/FileDropInput";
import Scaffold from "components/Scaffold/Scaffold";
import PageTitle from "components/PageTitle";
import AppIcons from "components/AppIcons";
import TitleIcon from "components/TitleIcon";

export default function EditTerm(props) {
  const apiService = useApiService();
  const match = useRouteMatch<any>();
  const [originalTerm, setOriginalTerm] = React.useState<TermChallenge>(null);
  const [originalChallenges, setOriginalChallenges] = React.useState<Challenge[]>(null);
  const [challenges, setChallenges] = useState<Challenge[]>(null);
  const [termChallenge, setTermChallenge] = useState<TermChallenge>(null);
  const [loadingStatus, setLoadingStatus] = React.useState(Loading.GROUP);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    const loadTermToEdit = async () => {
      try {
        await new Promise((r) => setTimeout(r, 32));
        const term = await apiService.terms.getTerm(match.params.id);

        term.topics = term.topics || [];
        setTermChallenge(term);
        setOriginalTerm(term);
        setLoadingStatus(Loading.INDIVIDUAL);

        const challengesList = (
          await Promise.all<Challenge>(
            term.challengeIds.map((cId) => apiService.challenges.getChallenge(cId))
          )
        ).filter((c) => c);

        setChallenges(challengesList);
        setOriginalChallenges(challengesList);
        setLoadingStatus(Loading.COMPLETE);
      } catch (e) {
        alert(e);
      }
    };
    loadTermToEdit();
  }, []);

  function validateForm() {
    return termChallenge && challenges.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Update challenges before updating term
      const challengeUpdateIndexes = challenges
        .map((_, idx) => idx)
        .filter((origIdx) => {
          return challenges[origIdx] !== originalChallenges.find((c2) => c2.id === challenges[origIdx].id);
        });

      const uploadedChallenges: Challenge[] = await apiService.challenges.createChallenges(
        challengeUpdateIndexes.map((origIdx) => challenges[origIdx])
      );

      // Reassemble challenge IDs array by merging the updated IDs into the original
      const challengeIds = challenges.map((c) => c.id);
      challengeUpdateIndexes.forEach((arrIdx, i) => {
        if (uploadedChallenges[i].id) {
          challengeIds[arrIdx] = uploadedChallenges[i].id;
        }
      });

      // Push changes to the Terms db
      const termChallengeToUpload = produce(termChallenge, (draft) => {
        draft.challengeIds = challengeIds;
      });

      const result = await apiService.terms.updateTerm(termChallengeToUpload);

      if (!result) {
        throw "Overwrite error";
      }

      if (!termChallenge.id) return console.log("Update failed!");
      props.history.push("/challenge/" + termChallenge.id);
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  function updateTermChallenge(tc: Partial<TermChallenge>) {
    const updated = produce(termChallenge, (draft) => {
      draft.title = isValued(tc.title) ? tc.title : draft.title;
      draft.uploadImgFile = isValued(tc.uploadImgFile) ? tc.uploadImgFile : draft.uploadImgFile;
      draft.topics = isValued(tc.topics) ? tc.topics : draft.topics;
      draft.challengeIds = isValued(tc.challengeIds) ? tc.challengeIds : draft.challengeIds;
    });
    setTermChallenge(updated);
  }

  function updateIndivChallenge(idx: number, c: Partial<Challenge>) {
    const updated = produce(challenges, (drafts) => {
      const draft = drafts[idx];
      if (!draft) {
        drafts[idx] = c as Challenge;
      } else {
        draft.title = isValued(c.title) ? c.title : draft.title;
        draft.uploadImgFile = isValued(c.uploadImgFile) ? c.uploadImgFile : draft.uploadImgFile;
        draft.uploadImgFile = isValued(c.uploadImgFile) ? c.uploadImgFile : draft.uploadImgFile;
        draft.imageUrl = isValued(c.imageUrl) ? c.imageUrl : draft.imageUrl;
        draft.questions = isValued(c.questions) ? c.questions : draft.questions;
      }
    });
    setChallenges(updated);
  }

  function deleteIndivChallenge(idx) {
    setChallenges(
      produce(challenges, (drafts) => {
        drafts.splice(idx, 1);
      })
    );
  }

  const handleAddTopic = () => {
    setTermChallenge(
      produce(termChallenge, (draft) => {
        draft.topics.push("");
      })
    );
  };

  const handleDeleteTopic = (tIdx: number) => {
    setTermChallenge(
      produce(termChallenge, (draft) => {
        draft.topics.splice(tIdx, 1);
      })
    );
  };

  const handleEditTopic = (tIdx: number, topic: string) => {
    setTermChallenge(
      produce(termChallenge, (draft) => {
        draft.topics[tIdx] = topic;
      })
    );
  };

  const hasChanged =
    originalChallenges !== challenges || (originalTerm !== null && originalTerm !== termChallenge);

  return (
    <Scaffold>
      <form onSubmit={handleSubmit}>
        <PageTitle>Edit Term Challenge</PageTitle>
        {loadingStatus === Loading.GROUP && <LoadingIndicator />}
        {termChallenge && (
          <>
            <div className="mt-4 d-flex align-items-center">
              <TitleIcon icon={AppIcons.rocket} />
              <h4 className="mb-0 ml-3">Term Details</h4>
            </div>
            <div
              className="my-4 appcard p-4 d-flex flex-column"
              style={{ borderRadius: 24, background: "#fff" }}
            >
              <h5>Title</h5>
              <Form.Group controlId="title">
                <Form.Control
                  value={termChallenge.title}
                  onChange={(e) => updateTermChallenge({ title: e.target.value })}
                />
              </Form.Group>
              <div className="mb-3">
                <h5>Term Challenge Image</h5>
                <FileDropInput
                  id="term-image-upload"
                  className="mb-1"
                  onFileInput={(file) => updateTermChallenge({ uploadImgFile: file })}
                />
              </div>
              <h5>Topics</h5>
              <TopicsList
                topics={termChallenge.topics}
                onAdd={handleAddTopic}
                onDelete={handleDeleteTopic}
                onEdit={handleEditTopic}
              />
            </div>
            <div className="my-4 d-flex align-items-center">
              <TitleIcon icon={AppIcons.list} />
              <h4 className="mb-0 ml-3">Individual Challenges</h4>
            </div>
            <Form.Group controlId="missions">
              <h5>Individual Challenges</h5>
              {loadingStatus === Loading.INDIVIDUAL && <LoadingIndicator />}
              {challenges && (
                <IndivChallenges
                  challenges={challenges}
                  onChange={updateIndivChallenge}
                  onDelete={deleteIndivChallenge}
                />
              )}
            </Form.Group>
            <LoaderButton block type="submit" isLoading={isLoading} disabled={!hasChanged || !validateForm()}>
              Save
            </LoaderButton>
          </>
        )}
      </form>
    </Scaffold>
  );
}
