import React, { useCallback, useEffect, useMemo, useState } from "react";
import PatogenoListView from "./patogenoListView";
import { useNavigate } from "react-router-dom";
import UsePatogeno from "../api/patogenoApi";
import { IPatogeno } from "../../../libs/typings";

interface IPatogenoListContollerContext {
  todoList: IPatogeno[];
  loading: boolean;
  onAdd: () => void;
  onDelete: (row: any) => void;
}

export const PatogenoListControllerContext =
  React.createContext<IPatogenoListContollerContext>(
    {} as IPatogenoListContollerContext
  );

const PatogenoListController = () => {
  const navigate = useNavigate();
  const { list, loading, deletePatogeno } = UsePatogeno();
  const [result, setResults] = useState<IPatogeno[]>([]);

  useEffect(() => {
    const fetchPatogenos = async () => {
      try {
        const result = await list();
        console.log("resultado = ", result);
        setResults(result ?? []);
      } catch (error) {
        console.error("Erro ao buscar patógenos:", error);
      }
    };

    fetchPatogenos();
  }, []);

  const patogenos = result ?? ([] as IPatogeno[]);
  const totalItens = patogenos?.length ?? 0;

  const onAdd = useCallback(() => {
    navigate(`/patogeno/create`);
  }, []);

  const onDelete = useCallback(async (id: number) => {
    await deletePatogeno(id);
  }, []);

  const providerValues: IPatogenoListContollerContext = useMemo(
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
    <PatogenoListControllerContext.Provider value={providerValues}>
      <PatogenoListView />
    </PatogenoListControllerContext.Provider>
  );
};

export default PatogenoListController;
