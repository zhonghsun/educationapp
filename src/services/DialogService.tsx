import React from 'react';
import produce from 'immer';
import Dialog from 'components/Dialog';
import { ButtonOptions } from 'models/ButtonOptions';

interface DialogConfig {
  title: string;
  body: string | JSX.Element;
  buttons: ButtonOptions[];
}

interface DialogState {
  activeDialog: DialogConfig;
  openDialog: (dialog: DialogConfig) => void;
  closeDialog: () => void;
}

const defaultDialogState: DialogState = {
  activeDialog: null,
  openDialog: () => console.error('openDialog called before initialization'),
  closeDialog: () => console.error('closeDialog called before initialization'),
};

const DialogContext = React.createContext(defaultDialogState);

export const DialogProvider = (props: React.PropsWithChildren<{}>) => {
  const [dialogState, setDialogState] = React.useState(defaultDialogState);

  React.useEffect(() => {
    const openDialog = (dialog: DialogConfig) => {
      setDialogState((current) =>
        produce(current, (draft) => {
          draft.activeDialog = dialog;
        })
      );
    };

    const closeDialog = () => {
      setDialogState((current) =>
        produce(current, (draft) => {
          draft.activeDialog = null;
        })
      );
    };

    setDialogState((current) =>
      produce(current, (draft) => {
        draft.openDialog = openDialog;
        draft.closeDialog = closeDialog;
      })
    );
  }, []);

  return (
    <DialogContext.Provider value={dialogState}>
      {props.children}
    </DialogContext.Provider>
  );
};

export const useDialogContext = () => React.useContext(DialogContext);

export const DialogRenderer = () => {
  const dialogContext = useDialogContext();

  if (!dialogContext.activeDialog) return null;

  const { title, body, buttons } = dialogContext.activeDialog;
  return (
    <Dialog
      onClose={dialogContext.closeDialog}
      show
      title={title}
      body={body}
      buttons={buttons}
    />
  );
};
