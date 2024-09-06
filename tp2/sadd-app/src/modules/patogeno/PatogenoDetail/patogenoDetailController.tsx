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
  onCreate: (doc: IPatogeno) => void;
  handleChange: (id: string) => void;
}

export const PatogenoDetailControllerContext =
  createContext<IPatogenoDetailContollerContext>(
    {} as IPatogenoDetailContollerContext
  );

const PatogenoDetailController = () => {
  const navigate = useNavigate();
  const { id, state } = useContext(PatogenoModuleContext);
  const { getPatogenoById, createPatogeno, loading } = UsePatogeno();
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

  const onCreate = useCallback(async (doc: IPatogeno) => {
    try {
      const response = await createPatogeno(doc);
      console.log("Patógeno criado com sucesso = ", response);
    } catch (error) {
      console.error("Erro ao cadastrar patógeno:", error);
    }
  }, []);

  return (
    <PatogenoDetailControllerContext.Provider
      value={{
        handleClosePage,
        document: result,
        loading,
        onCreate,
        handleChange,
      }}
    >
      <PatogenoDetailView />
    </PatogenoDetailControllerContext.Provider>
  );
};

export default PatogenoDetailController;
