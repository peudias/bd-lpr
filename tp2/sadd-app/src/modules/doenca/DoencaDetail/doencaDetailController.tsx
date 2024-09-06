import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import DoencaDetailView from "./doencaDetailView";
import { useNavigate } from "react-router-dom";
import { IDoenca } from "../../../libs/typings";
import { DoencaModuleContext } from "../doencaContainer";
import UseDoenca from "../api/doencaApi";

interface IDoencaDetailContollerContext {
  handleClosePage: () => void;
  document: IDoenca | undefined;
  loading: boolean;
  onSubmit: (doc: IDoenca) => void;
  handleChange: (id: string) => void;
}

export const DoencaDetailControllerContext =
  createContext<IDoencaDetailContollerContext>(
    {} as IDoencaDetailContollerContext
  );

const DoencaDetailController = () => {
  const navigate = useNavigate();
  const { id, state } = useContext(DoencaModuleContext);
  const { getDoencaById, updateDoenca, loading } = UseDoenca();
  const [result, setResults] = useState<IDoenca | undefined>(undefined);

  useEffect(() => {
    const fetchDoencas = async () => {
      try {
        const numericId = Number(id);
        const result = await getDoencaById(numericId);
        setResults(result);
      } catch (error) {
        console.error("Erro ao buscar doenças:", error);
      }
    };

    if (state === "edit" && id) {
      fetchDoencas();
    }
  }, [state, id]);

  const handleClosePage = useCallback(() => {
    navigate(-1);
  }, []);

  const handleChange = useCallback((id: string) => {
    navigate(`/pedido/edit/${id}`, { replace: true });
  }, []);

  const onSubmit = useCallback(async (doc: IDoenca) => {
    await updateDoenca(doc);
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
    <DoencaDetailControllerContext.Provider
      value={{
        handleClosePage,
        document: result,
        loading,
        onSubmit,
        handleChange,
      }}
    >
      <DoencaDetailView />
    </DoencaDetailControllerContext.Provider>
  );
};

export default DoencaDetailController;
