import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UseSintoma from "../api/sintomaApi";
import { IDoenca, ISintoma } from "../../../libs/typings";
import { SintomaModuleContext } from "../sintomaContainer";
import SintomaListView from "./sintomaListView";
import UseDoenca from "../../doenca/api/doencaApi";

interface ISintomaListContollerContext {
  todoList: ISintoma[];
  loading: boolean;
  onAdd: () => void;
  totalItens: number;
  doenca: IDoenca | undefined;
}

export const SintomaListControllerContext =
  React.createContext<ISintomaListContollerContext>(
    {} as ISintomaListContollerContext
  );

const SintomaListController = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { list, loading } = UseSintoma();
  const { getDoencaById } = UseDoenca();
  const [result, setResults] = useState<ISintoma[]>([]);
  const { id } = useContext(SintomaModuleContext);
  const [doenca, setDoenca] = useState<IDoenca>();

  useEffect(() => {
    const fetchSintomas = async () => {
      console.log("TOMAAA");
      try {
        const result = await list(id);
        setResults(result ?? []);
        const doencaBack = await getDoencaById(id);
        setDoenca(doencaBack);
      } catch (error) {
        console.error("Erro ao buscar doenças:", error);
      }
    };

    fetchSintomas();
  }, []);

  const sintomas = result ?? ([] as ISintoma[]);
  const totalItens = sintomas?.length ?? 0;

  const onAdd = useCallback(() => {
    navigate(`/sintoma/create/${id}`, {
      state: { from: location.state?.from },
    });
  }, [navigate]);

  const providerValues: ISintomaListContollerContext = useMemo(
    () => ({
      todoList: sintomas,
      loading,
      onAdd,
      totalItens,
      doenca,
    }),
    [result, loading, onAdd, doenca]
  );

  return (
    <SintomaListControllerContext.Provider value={providerValues}>
      <SintomaListView />
    </SintomaListControllerContext.Provider>
  );
};

export default SintomaListController;
