import React, { useCallback, useEffect, useMemo, useState } from "react";
import DoencaListView from "./doencaListView";
import { useNavigate } from "react-router-dom";
import UseDoenca from "../api/doencaApi";
import { IDoenca } from "../../../libs/typings";

interface IDoencaListContollerContext {
  todoList: IDoenca[];
  loading: boolean;
  onAdd: () => void;
  onDelete: (row: any) => void;
}

export const DoencaListControllerContext =
  React.createContext<IDoencaListContollerContext>(
    {} as IDoencaListContollerContext
  );

const DoencaListController = () => {
  const navigate = useNavigate();
  const { list, loading, deleteDoenca } = UseDoenca();
  const [result, setResults] = useState<IDoenca[]>([]);

  useEffect(() => {
    const fetchDoencas = async () => {
      try {
        const result = await list();
        console.log("resultado = ", result);
        setResults(result ?? []);
      } catch (error) {
        console.error("Erro ao buscar doenças:", error);
      }
    };

    fetchDoencas();
  }, []);

  const doencas = result ?? ([] as IDoenca[]);
  const totalItens = doencas?.length ?? 0;

  const onAdd = useCallback(() => {
    navigate(`/doenca/create`);
  }, []);

  const onDelete = useCallback(async (id: number) => {
    await deleteDoenca(id);
  }, []);

  const providerValues: IDoencaListContollerContext = useMemo(
    () => ({
      todoList: result,
      loading,
      onAdd,
      onDelete,
      totalItens,
    }),
    [result, loading]
  );

  return (
    <DoencaListControllerContext.Provider value={providerValues}>
      <DoencaListView />
    </DoencaListControllerContext.Provider>
  );
};

export default DoencaListController;
