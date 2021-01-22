import React from "react";
import { AuthProvider } from "contexts/AuthContext";
import { ApiProvider } from "services/ApiService";
import { LoaderProvider } from "services/LoaderService";
import { DialogProvider } from "services/DialogService";

interface Props {}

const AppContextProviders = (props: React.PropsWithChildren<Props>) => {
  return (
    <ApiProvider>
      <AuthProvider>
        <LoaderProvider>
          <DialogProvider>{props.children}</DialogProvider>
        </LoaderProvider>
      </AuthProvider>
    </ApiProvider>
  );
};

export default AppContextProviders;
