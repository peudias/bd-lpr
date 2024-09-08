import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import DoencaDetailView, { IFormDoenca } from "./doencaDetailView";
import { useNavigate } from "react-router-dom";
import { IDoenca, IPatogeno } from "../../../libs/typings";
import { DoencaModuleContext } from "../doencaContainer";
import UseDoenca from "../api/doencaApi";
import UsePatogeno from "../../patogeno/api/patogenoApi";

interface IDoencaDetailContollerContext {
  handleClosePage: () => void;
  document: IDoenca | undefined;
  patogenos: IPatogeno[] | undefined;
  loading: boolean;
  onCreate: (doc: IFormDoenca) => void;
  handleChange: (id: string) => void;
  callBack: string | null;
  typeAlert: "success" | "error" | "warning" | "info";
}

export const DoencaDetailControllerContext =
  createContext<IDoencaDetailContollerContext>(
    {} as IDoencaDetailContollerContext
  );

const DoencaDetailController = () => {
  const navigate = useNavigate();
  const { id, state } = useContext(DoencaModuleContext);
  const {
    getDoencaById,
    createDoenca,
    loading: loadingDoenca,
    callBack,
    alertType,
  } = UseDoenca();
  const { list: listPatogenos, loading: loadingPatogeno } = UsePatogeno();
  const [result, setResults] = useState<IDoenca | undefined>(undefined);
  const [patogenos, setPatogenos] = useState<IPatogeno[] | undefined>([]);

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

    const getPatogenos = async () => {
      try {
        const patogenosFromBack = await listPatogenos();
        setPatogenos(patogenosFromBack);
      } catch (error) {
        console.error("Erro ao buscar patógenos:", error);
      }
    };

    if (state === "edit" && id) {
      fetchDoencas();
    }
    if (state === "create") {
      getPatogenos();
    }
  }, [state, id]);

  const handleClosePage = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleChange = useCallback(
    (id: string) => {
      navigate(`/pedido/edit/${id}`, { replace: true });
    },
    [navigate]
  );

  const onCreate = useCallback(
    async (doc: IFormDoenca) => {
      await createDoenca(doc);
    },
    [createDoenca]
  );

  return (
    <DoencaDetailControllerContext.Provider
      value={{
        handleClosePage,
        document: result,
        patogenos,
        loading: loadingPatogeno || loadingDoenca,
        onCreate,
        handleChange,
        callBack,
        typeAlert: alertType,
      }}
    >
      <DoencaDetailView />
    </DoencaDetailControllerContext.Provider>
  );
};

export default DoencaDetailController;
