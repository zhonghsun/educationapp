import React, { useState } from "react";
import { Form } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import "./NewTerm.css";
import { TermChallenge } from "../../models/TermChallenge";
import produce from "immer";
import { isValued } from "../../utils/objectUtils";
import IndivChallenges from "../../components/IndivChallenges";
import { useApiService } from "../../services/ApiService";
import { Challenge } from "../../models/Challenge";
import TopicsList from "../../components/TopicsList/TopicsList";
import FileDropInput from "components/FileDropInput/FileDropInput";
import Scaffold from "components/Scaffold/Scaffold";
import AppIcons from "components/AppIcons";
import TitleIcon from "components/TitleIcon";
import ConfirmationDialog from "components/ConfirmationDialog";
import PageTitle from "components/PageTitle";

export default function NewTerm(props) {
  const apiService = useApiService();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [termChallenge, setTermChallenge] = useState(new TermChallenge());
  const [isLoading, setIsLoading] = useState(false);
  const [promptDeleteChallengeIdx, setPromptDeleteChallengeIdx] = React.useState<number>(null);

  function validateForm() {
    return termChallenge && challenges.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Create challenges before creating terms
      const uploadedChallenges: Challenge[] = await apiService.challenges.createChallenges(challenges);
      const termChallengeToUpload = produce(termChallenge, (draft) => {
        draft.challengeIds = uploadedChallenges.map((c) => c.id);
      });

      const result = await apiService.terms.createTerm(termChallengeToUpload);

      props.history.push("/challenge/" + result.id);
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
        draft.imageUrl = isValued(c.imageUrl) ? c.imageUrl : draft.imageUrl;
        draft.questions = isValued(c.questions) ? c.questions : draft.questions;
      }
    });
    setChallenges(updated);
  }

  function handlePromptDeleteChallenge(idx: number) {
    setPromptDeleteChallengeIdx(idx);
  }

  function deleteIndivChallenge(idx: number) {
    setChallenges(
      produce(challenges, (drafts) => {
        drafts.splice(idx, 1);
      })
    );
    handlePromptDeleteChallenge(null);
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

  return (
    <Scaffold>
      <form onSubmit={handleSubmit}>
        <PageTitle>Create New Term Challenge</PageTitle>
        <div className="mt-4 d-flex align-items-center">
          <TitleIcon icon={AppIcons.rocket} />
          <h4 className="mb-0 ml-3">Term Details</h4>
        </div>
        <div className="my-4 appcard p-4 d-flex flex-column" style={{ borderRadius: 24, background: "#fff" }}>
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
        <Form.Group className="mt-3" controlId="missions">
          <h5>Individual Challenges</h5>
          <IndivChallenges
            challenges={challenges}
            onChange={updateIndivChallenge}
            onDelete={handlePromptDeleteChallenge}
          />
        </Form.Group>
        <LoaderButton block type="submit" isLoading={isLoading} disabled={!validateForm()}>
          Create
        </LoaderButton>
      </form>

      <ConfirmationDialog
        show={promptDeleteChallengeIdx !== null}
        variant="danger"
        title="Confirm Delete Challenge"
        description={`Are you sure you wish to delete ${
          challenges[promptDeleteChallengeIdx]?.title || "this challenge"
        }?`}
        labelConfirm="DELETE"
        onConfirm={() => deleteIndivChallenge(promptDeleteChallengeIdx)}
        onClose={() => setPromptDeleteChallengeIdx(null)}
      />
    </Scaffold>
  );
}
