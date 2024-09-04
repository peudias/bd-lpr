import React from "react";
import { useParams } from "react-router-dom";
import DoencaDetailController from "./DoencaDetail/doencaDetailController";
import DoencaListController from "./DoencaList/doencaControllerList";
import SintomaListController from "../sintoma/SintomaList/sintomaControllerList";
import SintomaDetailController from "../sintoma/SintomaDetail/sintomaDetailController";

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
      return (
        <SintomaListController>
          <DoencaListController />{" "}
        </SintomaListController>
      );
    }
    if (state === "view") {
      return (
        <SintomaListController>
          <DoencaListController />{" "}
        </SintomaListController>
      );
    } else if (state === "edit" || state === "create") {
      return <SintomaDetailController />;
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
