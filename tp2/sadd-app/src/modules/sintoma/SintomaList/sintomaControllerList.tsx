import React, { useCallback, useEffect, useMemo, useState } from "react";
import SintomaListView from "./sintomaListView";
import { useNavigate } from "react-router-dom";
import UseSintoma from "../api/sintomaApi";
import { ISintoma } from "../../../libs/typings";

interface ISintomaListContollerContext {
  todoList: ISintoma[];
  loading: boolean;
  onAdd: () => void;
  onDelete: (row: any) => void;
}

export const SintomaListControllerContext =
  React.createContext<ISintomaListContollerContext>(
    {} as ISintomaListContollerContext
  );

const SintomaListController = () => {
  const navigate = useNavigate();
  const { list, loading, deleteSintoma } = UseSintoma();
  const [result, setResults] = useState<ISintoma[]>([]);

  useEffect(() => {
    const fetchSintomas = async () => {
      try {
        const result = await list();
        console.log("resultado = ", result);
        setResults(result ?? []);
      } catch (error) {
        console.error("Erro ao buscar sintomas:", error);
      }
    };

    fetchSintomas();
  }, []);

  const sintomas = result ?? ([] as ISintoma[]);
  const totalItens = sintomas?.length ?? 0;

  const onAdd = useCallback(() => {
    navigate(`/sintoma/create`);
  }, []);

  const onDelete = useCallback(async (id: number) => {
    await deleteSintoma(id);
  }, []);

  const providerValues: ISintomaListContollerContext = useMemo(
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
    <SintomaListControllerContext.Provider value={providerValues}>
      <SintomaListView />
    </SintomaListControllerContext.Provider>
  );
};

export default SintomaListController;
