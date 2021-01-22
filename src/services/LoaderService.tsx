import React from 'react';
import produce from 'immer';
import LoadingIndicator from 'components/LoadingIndicator';
import { Modal } from 'react-bootstrap';
import './Loader.scss';

interface LoaderState {
  isShown: boolean;
  shownContent: string | JSX.Element;
  show: (content?: string | JSX.Element) => void;
  hide: () => void;
}

const defaultState: LoaderState = {
  isShown: false,
  shownContent: null,
  show: () =>
    console.error('Loading service is used before it has been initialized'),
  hide: () =>
    console.error('Loading service is used before it has been initialized'),
};

const LoaderContext = React.createContext(defaultState);

export const LoaderProvider = (props) => {
  const [loaderState, setLoaderState] = React.useState(defaultState);

  React.useEffect(() => {
    const show = (content?: string | JSX.Element) => {
      setLoaderState((s) =>
        produce(s, (draft) => {
          draft.shownContent = content || draft.shownContent;
          draft.isShown = true;
        })
      );
    };
    const hide = () => {
      setLoaderState((s) =>
        produce(s, (draft) => {
          draft.isShown = false;
        })
      );
    };
    setLoaderState((state) => ({ ...state, show, hide }));
  }, []);

  return (
    <LoaderContext.Provider value={loaderState}>
      {props.children}
      {loaderState.isShown && <LoaderModal />}
    </LoaderContext.Provider>
  );
};

export const useLoaderService = () => {
  return React.useContext(LoaderContext);
};

const LoaderModal = React.memo(() => {
  const loaderSvc = useLoaderService();

  return (
    <Modal
      show
      onHide={() => {}}
      centered
      className="loader-dialog-level-2"
      backdropClassName="loader-backdrop-level-2"
    >
      <div className="loader-content">
        <LoadingIndicator />
        <div className="loader-text">{loaderSvc.shownContent || 'Loading...'}</div>
      </div>
    </Modal>
  );
});
