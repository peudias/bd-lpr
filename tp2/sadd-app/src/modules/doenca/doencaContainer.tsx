import React from "react";
import { useParams } from "react-router-dom";
import DoencaDetailController from "./DoencaDetail/doencaDetailController";
import DoencaListController from "./DoencaList/doencaControllerList";

export interface IDoencaModuleContext {
  state?: string;
  id?: string;
}

export const DoencaModuleContext = React.createContext<IDoencaModuleContext>(
  {}
);

const DoencaModule = () => {
  let { screenState, id } = useParams();
  const state = screenState;

  const validState = ["view", "edit", "create"];

  const renderPage = () => {
    if (!state || !validState.includes(state)) {
      return <DoencaListController />;
    }
    if (state === "view") {
      return <DoencaListController />;
    } else if (state === "edit" || state === "create") {
      return <DoencaDetailController />;
    }
  };

  const providerValue: IDoencaModuleContext = {
    state,
    id,
  };

  return (
    <DoencaModuleContext.Provider value={providerValue}>
      {renderPage()}
    </DoencaModuleContext.Provider>
  );
};

export default DoencaModule;
