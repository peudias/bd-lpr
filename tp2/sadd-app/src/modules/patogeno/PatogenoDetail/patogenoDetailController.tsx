import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import PatogenoDetailView from "./patogenoDetailView";
import { useNavigate } from "react-router-dom";
import { IPatogeno } from "../../../libs/typings";
import { PatogenoModuleContext } from "../patogenoContainer";
import UsePatogeno from "../api/patogenoApi";

interface IPatogenoDetailContollerContext {
  handleClosePage: () => void;
  document: IPatogeno | undefined;
  loading: boolean;
  onSubmit: (doc: IPatogeno) => void;
  handleChange: (id: string) => void;
}

export const PatogenoDetailControllerContext =
  createContext<IPatogenoDetailContollerContext>(
    {} as IPatogenoDetailContollerContext
  );

const PatogenoDetailController = () => {
  const navigate = useNavigate();
  const { id, state } = useContext(PatogenoModuleContext);
  const { getPatogenoById, updatePatogeno, loading } = UsePatogeno();
  const [result, setResults] = useState<IPatogeno | undefined>(undefined);

  useEffect(() => {
    const fetchPatogenos = async () => {
      try {
        const numericId = Number(id);
        const result = await getPatogenoById(numericId);
        setResults(result);
      } catch (error) {
        console.error("Erro ao buscar patógenos:", error);
      }
    };

    if (state === "edit" && id) {
      fetchPatogenos();
    }
  }, [state, id]);

  const handleClosePage = useCallback(() => {
    navigate(-1);
  }, []);

  const handleChange = useCallback((id: string) => {
    navigate(`/pedido/edit/${id}`, { replace: true });
  }, []);

  const onSubmit = useCallback(async (doc: IPatogeno) => {
    await updatePatogeno(doc);
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
    <PatogenoDetailControllerContext.Provider
      value={{
        handleClosePage,
        document: result,
        loading,
        onSubmit,
        handleChange,
      }}
    >
      <PatogenoDetailView />
    </PatogenoDetailControllerContext.Provider>
  );
};

export default PatogenoDetailController;
