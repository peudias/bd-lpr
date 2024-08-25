import React from "react";
import { useParams } from "react-router-dom";
import PatogenoDetailController from "./PatogenoDetail/patogenoDetailController";
import PatogenoListController from "./PatogenoList/patogenoControllerList";

export interface IPatogenoModuleContext {
  state?: string;
  id?: string;
}

export const PatogenoModuleContext =
  React.createContext<IPatogenoModuleContext>({});

const PatogenoModule = () => {
  let { screenState, id } = useParams();
  const state = screenState;

  const validState = ["view", "edit", "create"];

  const renderPage = () => {
    if (!state || !validState.includes(state)) {
      return <PatogenoListController />;
    }
    if (state === "view") {
      return <PatogenoListController />;
    } else if (state === "edit" || state === "create") {
      return <PatogenoDetailController />;
    }
  };

  const providerValue: IPatogenoModuleContext = {
    state,
    id,
  };

  return (
    <PatogenoModuleContext.Provider value={providerValue}>
      {renderPage()}
    </PatogenoModuleContext.Provider>
  );
};

export default PatogenoModule;
