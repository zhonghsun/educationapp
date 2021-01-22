import React, { useState } from "react";
import { Form } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import produce from "immer";
import { isValued } from "../../utils/objectUtils";
import { useApiService } from "../../services/ApiService";
import TopicsList from "../../components/TopicsList/TopicsList";
import { Venue } from "models/Venue";
import { Mission } from "models/Mission";
import IndivChallenges from "components/IndivChallenges";
import "./NewVenue.css";
import FileDropInput from "components/FileDropInput/FileDropInput";
import Scaffold from "components/Scaffold/Scaffold";
import TitleIcon from "components/TitleIcon";
import AppIcons from "components/AppIcons";
import ConfirmationDialog from "components/ConfirmationDialog";
import PageTitle from "components/PageTitle";

export default function NewVenue(props) {
  const apiService = useApiService();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [venue, setVenue] = useState(new Venue());
  const [isLoading, setIsLoading] = useState(false);
  const [promptDeleteMissionIdx, setPromptDeleteMissionIdx] = React.useState<number>(null);

  function validateForm() {
    return venue && missions.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Create missions before creating terms
      const uploadedMissions: Mission[] = await apiService.missions.createMissions(missions);
      const venueToUpload = produce(venue, (draft) => {
        draft.missionIds = uploadedMissions.map((c) => c.id);
      });

      const result = await apiService.venues.createVenue(venueToUpload);

      props.history.push("/venue/" + result.id);
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  function updateVenue(v: Partial<Venue>) {
    const updated = produce(venue, (draft) => {
      draft.title = isValued(v.title) ? v.title : draft.title;
      draft.uploadImgFile = isValued(v.uploadImgFile) ? v.uploadImgFile : draft.uploadImgFile;
      draft.background = isValued(v.background) ? v.background : draft.background;
      draft.instructions = isValued(v.instructions) ? v.instructions : draft.instructions;
      draft.topics = isValued(v.topics) ? v.topics : draft.topics;
      draft.missionIds = isValued(v.missionIds) ? v.missionIds : draft.missionIds;
    });
    setVenue(updated);
  }

  function updateIndivMission(idx: number, m: Partial<Mission>) {
    const updated = produce(missions, (drafts) => {
      const draft = drafts[idx];
      if (!draft) {
        drafts[idx] = m as Mission;
      } else {
        draft.title = isValued(m.title) ? m.title : draft.title;
        draft.uploadImgFile = isValued(m.uploadImgFile) ? m.uploadImgFile : draft.uploadImgFile;
        draft.imageUrl = isValued(m.imageUrl) ? m.imageUrl : draft.imageUrl;
        draft.questions = isValued(m.questions) ? m.questions : draft.questions;
      }
    });
    setMissions(updated);
  }

  function handlePromptDeleteMission(idx: number) {
    setPromptDeleteMissionIdx(idx);
  }

  function deleteIndivMission(idx: number) {
    setMissions(
      produce(missions, (drafts) => {
        drafts.splice(idx, 1);
      })
    );
    setPromptDeleteMissionIdx(null);
  }

  const handleAddTopic = () => {
    setVenue(
      produce(venue, (draft) => {
        draft.topics.push("");
      })
    );
  };

  const handleDeleteTopic = (tIdx: number) => {
    setVenue(
      produce(venue, (draft) => {
        draft.topics.splice(tIdx, 1);
      })
    );
  };

  const handleEditTopic = (tIdx: number, topic: string) => {
    setVenue(
      produce(venue, (draft) => {
        draft.topics[tIdx] = topic;
      })
    );
  };

  return (
    <Scaffold>
      <form onSubmit={handleSubmit}>
        <PageTitle>Create New Venue</PageTitle>
        <div className="mt-4 d-flex align-items-center">
          <TitleIcon icon={AppIcons.rocket} />
          <h4 className="mb-0 ml-3">Venue Details</h4>
        </div>
        <div className="my-4 appcard p-4 d-flex flex-column" style={{ borderRadius: 24, background: "#fff" }}>
          <h5>Title</h5>
          <Form.Group controlId="title">
            <Form.Control value={venue.title} onChange={(e) => updateVenue({ title: e.target.value })} />
          </Form.Group>
          <div className="mb-3">
            <h5>Venue Image</h5>
            <FileDropInput
              id="venue-image-upload"
              className="mb-1"
              onFileInput={(file) => updateVenue({ uploadImgFile: file })}
            />
          </div>
          <h5>Background</h5>
          <Form.Group controlId="background">
            <Form.Control
              as="textarea"
              rows="3"
              value={venue.background}
              onChange={(e: any) => updateVenue({ background: e.target.value })}
            />
          </Form.Group>
          <h5>Instructions</h5>
          <Form.Group controlId="background">
            <Form.Control
              as="textarea"
              rows="3"
              value={venue.instructions}
              onChange={(e: any) => updateVenue({ instructions: e.target.value })}
            />
          </Form.Group>
          <h5>Topics</h5>
          <TopicsList
            topics={venue.topics}
            onAdd={handleAddTopic}
            onDelete={handleDeleteTopic}
            onEdit={handleEditTopic}
          />
        </div>
        <div className="my-4 d-flex align-items-center">
          <TitleIcon icon={AppIcons.list} />
          <h4 className="mb-0 ml-3">Missions</h4>
        </div>
        <Form.Group className="mt-3" controlId="missions">
          <IndivChallenges
            asMissions
            challenges={missions}
            onChange={updateIndivMission}
            onDelete={handlePromptDeleteMission}
          />
        </Form.Group>
        <LoaderButton block type="submit" isLoading={isLoading} disabled={!validateForm()}>
          Create
        </LoaderButton>
      </form>

      <ConfirmationDialog
        show={promptDeleteMissionIdx !== null}
        variant="danger"
        title="Confirm Delete Mission"
        description={`Are you sure you wish to delete ${
          missions[promptDeleteMissionIdx]?.title || "this mission"
        }?`}
        labelConfirm="DELETE"
        onConfirm={() => deleteIndivMission(promptDeleteMissionIdx)}
        onClose={() => setPromptDeleteMissionIdx(null)}
      />
    </Scaffold>
  );
}
