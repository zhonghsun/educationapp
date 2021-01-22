import React, { useState, useEffect } from "react";
import { useApiService } from "services/ApiService";
import ConfirmationDialog from "components/ConfirmationDialog";
import { Venue } from "models/Venue";
import { useHistory } from "react-router";
import LoadingIndicator from "components/LoadingIndicator";
import "./VenuesPage.css";
import "styles/buttons.scss";
import Scaffold from "components/Scaffold/Scaffold";
import VenuePageListItem from "./components/VenuePageListItem";
import VenuePageActionRow from "./components/VenuePageActionRow";
import PageTitle from "components/PageTitle";

export default function Venues(props) {
  const apiService = useApiService();
  const history = useHistory();
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [promptDelete, setPromptDelete] = useState<number>(null);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }

      try {
        const fetchedVenues = await apiService.venues.getAllVenues();
        setVenues(fetchedVenues);
      } catch (e) {
        alert(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [props.isAuthenticated]);

  const goToEditVenue = React.useCallback((id: string) => {
    history.push("/venue/" + id + "/edit");
  }, []);

  const promptDeleteVenue = React.useCallback((idx) => {
    setPromptDelete(idx);
  }, []);

  const deleteVenue = React.useCallback((venue: Venue) => {
    return apiService.venues.deleteVenue(venue);
  }, []);

  function renderVenuesList(venues: Venue[]) {
    return (
      <>
        {venues.map((venue, idx) => (
          <VenuePageListItem
            key={venue.id}
            venue={venue}
            onEdit={() => goToEditVenue(venue.id)}
            onDelete={() => promptDeleteVenue(idx)}
          />
        ))}
        <ConfirmationDialog
          show={promptDelete !== null}
          variant="danger"
          title="Confirm Delete"
          description={`Are you sure you wish to delete ${venues[promptDelete]?.title}?`}
          labelConfirm="DELETE"
          onConfirm={() => deleteVenue(venues[promptDelete])}
          onClose={() => setPromptDelete(null)}
        />
      </>
    );
  }

  return (
    <Scaffold>
      <PageTitle>Your Venues</PageTitle>
      <VenuePageActionRow />
      {isLoading && <LoadingIndicator className="align-self-center" />}
      {!isLoading && renderVenuesList(venues)}
    </Scaffold>
  );
}
