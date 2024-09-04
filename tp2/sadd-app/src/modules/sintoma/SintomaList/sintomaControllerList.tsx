import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import UseSintoma from "../api/sintomaApi";
import { ISintoma } from "../../../libs/typings";

interface ISintomaListContollerContext {
  todoList: ISintoma[];
  loading: boolean;
  onAdd: () => void;
  onDelete: (id: number) => void;
}

interface SintomaListControllerProps {
  children?: React.ReactNode;
}

export const SintomaListControllerContext =
  React.createContext<ISintomaListContollerContext>(
    {} as ISintomaListContollerContext
  );

const SintomaListController: React.FC<SintomaListControllerProps> = ({
  children,
}) => {
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
  }, [list]);

  const onAdd = useCallback(() => {
    navigate(`/sintoma/create`);
  }, [navigate]);

  const onDelete = useCallback(
    async (id: number) => {
      await deleteSintoma(id);
      setResults((prevResults) =>
        prevResults.filter((sintoma) => sintoma.id !== id)
      );
    },
    [deleteSintoma]
  );

  const providerValues: ISintomaListContollerContext = useMemo(
    () => ({
      todoList: result,
      loading,
      onAdd,
      onDelete,
    }),
    [result, loading, onAdd, onDelete]
  );

  return (
    <SintomaListControllerContext.Provider value={providerValues}>
      {children}
    </SintomaListControllerContext.Provider>
  );
};

export default SintomaListController;
