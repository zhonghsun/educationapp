import React, { useState } from "react";
import { Form } from "react-bootstrap";
import LoaderButton from "components/LoaderButton";
import "./NewVenue.css";
import { Venue } from "models/Venue";
import produce from "immer";
import { isValued } from "utils/objectUtils";
import { useApiService } from "services/ApiService";
import { Mission } from "models/Mission";
import TopicsList from "components/TopicsList/TopicsList";
import { useRouteMatch } from "react-router";
import { Loading } from "models/LoadingStatus";
import LoadingIndicator from "components/LoadingIndicator";
import IndivChallenges from "components/IndivChallenges";
import FileDropInput from "components/FileDropInput/FileDropInput";
import Scaffold from "components/Scaffold/Scaffold";
import PageTitle from "components/PageTitle";
import AppIcons from "components/AppIcons";
import TitleIcon from "components/TitleIcon";

export default function EditVenue(props) {
  const apiService = useApiService();
  const match = useRouteMatch<any>();
  const [originalVenue, setOriginalVenue] = React.useState<Venue>(null);
  const [originalMissions, setOriginalMissions] = React.useState<Mission[]>(null);
  const [missions, setMissions] = useState<Mission[]>(null);
  const [venue, setVenue] = useState<Venue>(null);
  const [loadingStatus, setLoadingStatus] = React.useState(Loading.GROUP);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    const loadVenueToEdit = async () => {
      try {
        await new Promise((r) => setTimeout(r, 32));
        const venueResult = await apiService.venues.getVenue(match.params.id);

        venueResult.topics = venueResult.topics || [];
        setVenue(venueResult);
        setOriginalVenue(venueResult);
        setLoadingStatus(Loading.INDIVIDUAL);

        const missionsList = (
          await Promise.all<Mission>(venueResult.missionIds.map((mId) => apiService.missions.getMission(mId)))
        ).filter((c) => c);

        setMissions(missionsList);
        setOriginalMissions(missionsList);
        setLoadingStatus(Loading.COMPLETE);
      } catch (e) {
        alert(e);
      }
    };
    loadVenueToEdit();
  }, []);

  function validateForm() {
    return venue && missions.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Update missions before updating term
      const missionUpdateIndexes = missions
        .map((_, idx) => idx)
        .filter((origIdx) => {
          return missions[origIdx] !== originalMissions.find((c2) => c2.id === missions[origIdx].id);
        });

      const uploadedMissions: Mission[] = await apiService.missions.createMissions(
        missionUpdateIndexes.map((origIdx) => missions[origIdx])
      );

      // Reassemble mission IDs array by merging the updated IDs into the original
      const missionIds = missions.map((c) => c.id);
      missionUpdateIndexes.forEach((arrIdx, i) => {
        if (uploadedMissions[i].id) {
          missionIds[arrIdx] = uploadedMissions[i].id;
        }
      });

      // Push changes to the Venues db
      const venueToUpload = produce(venue, (draft) => {
        draft.missionIds = missionIds;
      });

      const result = await apiService.venues.updateVenue(venueToUpload);

      if (!result) {
        throw "Overwrite error";
      }

      if (!venue.id) return window.alert("SHIT");
      props.history.push("/venue/" + venue.id);
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

  function updateMission(idx: number, m: Partial<Mission>) {
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

  function deleteMission(idx: number) {
    setMissions(
      produce(missions, (drafts) => {
        drafts.splice(idx, 1);
      })
    );
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

  const hasChanged = originalMissions !== missions || (originalVenue !== null && originalVenue !== venue);

  return (
    <Scaffold>
      <form onSubmit={handleSubmit} className="d-flex flex-column">
        <PageTitle>Edit Venue</PageTitle>
        {loadingStatus === Loading.GROUP && <LoadingIndicator className="align-self-center" />}
        {venue && (
          <>
            <div className="mt-4 d-flex align-items-center">
              <TitleIcon icon={AppIcons.rocket} />
              <h4 className="mb-0 ml-3">Venue Details</h4>
            </div>
            <div
              className="my-4 appcard p-4 d-flex flex-column"
              style={{ borderRadius: 24, background: "#fff" }}
            >
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
            <Form.Group controlId="missions">
              <h5>Missions</h5>
              {loadingStatus === Loading.INDIVIDUAL && <LoadingIndicator />}
              {missions && (
                <IndivChallenges
                  asMissions
                  challenges={missions}
                  onChange={updateMission}
                  onDelete={deleteMission}
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
