import React from "react";
import { useParams } from "react-router-dom";
import SintomaDetailController from "./SintomaDetail/sintomaDetailController";
import SintomaListController from "./SintomaList/sintomaControllerList";

export interface ISintomaModuleContext {
  state?: string;
  id?: string;
}

export const SintomaModuleContext = React.createContext<ISintomaModuleContext>(
  {}
);

const SintomaModule = () => {
  let { screenState, id } = useParams();
  const state = screenState;

  const validState = ["view", "edit", "create"];

  const renderPage = () => {
    if (!state || !validState.includes(state)) {
      return <SintomaListController />;
    }
    if (state === "view") {
      return <SintomaListController />;
    } else if (state === "edit" || state === "create") {
      return <SintomaDetailController />;
    }
  };

  const providerValue: ISintomaModuleContext = {
    state,
    id,
  };

  return (
    <SintomaModuleContext.Provider value={providerValue}>
      {renderPage()}
    </SintomaModuleContext.Provider>
  );
};

export default SintomaModule;
