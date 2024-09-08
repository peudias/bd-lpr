import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import SintomaDetailView from "./sintomaDetailView";
import { useNavigate } from "react-router-dom";
import { IDoenca, ISintoma } from "../../../libs/typings";
import { SintomaModuleContext } from "../sintomaContainer";
import UseSintoma from "../api/sintomaApi";
import UseDoenca from "../../doenca/api/doencaApi";

interface ISintomaDetailContollerContext {
  handleClosePage: () => void;
  document: ISintoma | undefined;
  loading: boolean;
  doenca: IDoenca | undefined;
  onCreate: (doc: ISintoma) => void;
}

export const SintomaDetailControllerContext =
  createContext<ISintomaDetailContollerContext>(
    {} as ISintomaDetailContollerContext
  );

const SintomaDetailController = () => {
  const navigate = useNavigate();
  const { id, state } = useContext(SintomaModuleContext);
  const { getDoencaById } = UseDoenca();
  const { createSintoma, loading } = UseSintoma();
  const [result, setResults] = useState<ISintoma | undefined>(undefined);
  const [doenca, setDoenca] = useState<IDoenca>();

  useEffect(() => {
    const fetchSintomas = async () => {
      try {
        const doencaBack = await getDoencaById(id);
        setDoenca(doencaBack);
      } catch (error) {
        console.error("Erro ao buscar sintomas:", error);
      }
    };

    if (id) {
      fetchSintomas();
    }
  }, [state, id]);

  const handleClosePage = useCallback(() => {
    navigate(-1);
  }, []);

  const onCreate = useCallback(
    async (doc: ISintoma) => {
      await createSintoma(doc, id);
    },
    [createSintoma]
  );

  const providerValues: ISintomaDetailContollerContext = useMemo(
    () => ({
      handleClosePage,
      document: result,
      loading,
      onCreate,
      doenca,
    }),
    [result, loading, doenca]
  );

  return (
    <SintomaDetailControllerContext.Provider value={providerValues}>
      <SintomaDetailView />
    </SintomaDetailControllerContext.Provider>
  );
};

export default SintomaDetailController;
