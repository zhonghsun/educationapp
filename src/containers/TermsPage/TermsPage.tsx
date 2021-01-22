import React, { useState, useEffect } from "react";
import { useApiService } from "../../services/ApiService";
import ConfirmationDialog from "components/ConfirmationDialog";
import { TermChallenge } from "models/TermChallenge";
import { useHistory } from "react-router";
import LoadingIndicator from "components/LoadingIndicator";
import { useLoaderService } from "services/LoaderService";
import produce from "immer";
import Scaffold from "components/Scaffold/Scaffold";
import TermsPageActionRow from "./components/TermsPageActionRow";
import "styles/buttons.scss";
import "./TermsPage.css";
import TermsPageListItem from "./components/TermsPageListItem";
import PageTitle from "components/PageTitle";

export default function TermsPage(props) {
  const apiService = useApiService();
  const loaderSvc = useLoaderService();
  const history = useHistory();
  const [terms, setTerms] = useState<TermChallenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [promptDelete, setPromptDelete] = useState<number>(null);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }

      try {
        const terms = await apiService.terms.getAllTerms();
        setTerms(terms);
      } catch (e) {
        alert(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [props.isAuthenticated]);

  const goToEditTerm = React.useCallback((id: string) => {
    history.push("/challenge/" + id + "/edit");
  }, []);

  const promptDeleteTerm = React.useCallback((idx) => {
    setPromptDelete(idx);
  }, []);

  const deleteTerm = React.useCallback(async (term: TermChallenge) => {
    loaderSvc.show("Deleting...");
    await apiService.terms.deleteTerm(term);

    loaderSvc.hide();
    setTerms((terms) =>
      produce(terms, (draft) => {
        const idx = draft.findIndex((t) => t.id === term.id);
        if (idx === -1) return;
        draft.splice(idx, 1);
      })
    );
    setPromptDelete(null);
  }, []);

  function renderTermChallengesList(terms: TermChallenge[]) {
    return (
      <>
        {terms.map((term, idx) => (
          <TermsPageListItem
            key={term.id}
            termChallenge={term}
            onEdit={() => goToEditTerm(term.id)}
            onDelete={() => promptDeleteTerm(idx)}
          />
        ))}
        <ConfirmationDialog
          show={promptDelete !== null}
          variant="danger"
          title="Confirm Delete"
          description={`Are you sure you wish to delete ${terms[promptDelete]?.title}?`}
          labelConfirm="DELETE"
          onConfirm={() => deleteTerm(terms[promptDelete])}
          onClose={() => setPromptDelete(null)}
        />
      </>
    );
  }

  return (
    <Scaffold>
      <PageTitle>Your Term Challenges</PageTitle>
      <TermsPageActionRow />
      {isLoading && <LoadingIndicator className="align-self-center" />}
      {!isLoading && renderTermChallengesList(terms)}
    </Scaffold>
  );
}
