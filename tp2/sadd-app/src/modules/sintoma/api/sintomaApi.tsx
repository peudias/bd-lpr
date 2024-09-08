import axios from "axios";
import { ISintoma } from "../../../libs/typings";
import { useState, useCallback } from "react";

type returnAll = {
  nome: string;
};

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://meusadd-back.vercel.app/api"
    : "http://localhost:3001/api";

function UseSintoma() {
  const [loading, setLoading] = useState<boolean>(false);

  const list = async (id: string | undefined) => {
    setLoading(true);
    try {
      const response = await axios.get<ISintoma[]>(`${baseURL}/sintoma/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar sintoma com ID ${id}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const listAll = async () => {
    setLoading(true);
    try {
      const response = await axios.get<returnAll[]>(`${baseURL}/sintoma`);
      return response.data.map((obj) => obj.nome);
    } catch (error) {
      console.error(`Erro ao buscar sintomas`, error);
    } finally {
      setLoading(false);
    }
  };

  const createSintoma = async (
    newSintoma: ISintoma,
    doenca_id: string | undefined
  ) => {
    setLoading(true);
    try {
      const response = await axios.post<ISintoma>(
        `${baseURL}/sintoma/${doenca_id}`,
        newSintoma
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao criar sintomas:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateSintoma = async (updatedSintoma: ISintoma) => {
    setLoading(true);
    try {
      const response = await axios.put<ISintoma>(
        `${baseURL}/sintoma/${updatedSintoma.id}`,
        updatedSintoma
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar sintomas:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSintoma = useCallback(async (id: number) => {
    setLoading(true);
    try {
      const response = await axios.delete(`${baseURL}/sintoma/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar sintomas:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    list,
    createSintoma,
    updateSintoma,
    deleteSintoma,
    listAll,
  };
}

export default UseSintoma;
