import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import SintomaDetailView from "./sintomaDetailView";
import { useNavigate } from "react-router-dom";
import { ISintoma } from "../../../libs/typings";
import { SintomaModuleContext } from "../sintomaContainer";
import UseSintoma from "../api/sintomaApi";

interface ISintomaDetailContollerContext {
  handleClosePage: () => void;
  document: ISintoma | undefined;
  loading: boolean;
  onSubmit: (doc: ISintoma) => void;
  handleChange: (id: string) => void;
}

export const SintomaDetailControllerContext =
  createContext<ISintomaDetailContollerContext>(
    {} as ISintomaDetailContollerContext
  );

const SintomaDetailController = () => {
  const navigate = useNavigate();
  const { id, state } = useContext(SintomaModuleContext);
  const { getSintomaById, updateSintoma, loading } = UseSintoma();
  const [result, setResults] = useState<ISintoma | undefined>(undefined);

  useEffect(() => {
    const fetchSintomas = async () => {
      try {
        const numericId = Number(id);
        const result = await getSintomaById(numericId);
        setResults(result);
      } catch (error) {
        console.error("Erro ao buscar sintomas:", error);
      }
    };

    if (state === "edit" && id) {
      fetchSintomas();
    }
  }, [state, id]);

  const handleClosePage = useCallback(() => {
    navigate(-1);
  }, []);

  const handleChange = useCallback((id: string) => {
    navigate(`/pedido/edit/${id}`, { replace: true });
  }, []);

  const onSubmit = useCallback(async (doc: ISintoma) => {
    await updateSintoma(doc);
  }, []);

  const isAtivo = {
    type: Array<String>,
    label: "Ativo",
    optional: false,
    options: () => [
      { value: "Sim", label: "Sim" },
      { value: "Não", label: "Não" },
    ],
    visibilityFunction: () => state !== "edit",
  };

  return (
    <SintomaDetailControllerContext.Provider
      value={{
        handleClosePage,
        document: result,
        loading,
        onSubmit,
        handleChange,
      }}
    >
      <SintomaDetailView />
    </SintomaDetailControllerContext.Provider>
  );
};

export default SintomaDetailController;
