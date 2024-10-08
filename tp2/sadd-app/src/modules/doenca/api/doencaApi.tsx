import axios from "axios";
import { IDoenca } from "../../../libs/typings";
import { useState } from "react";
import { IFormDoenca } from "../DoencaDetail/doencaDetailView";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://meusadd-back.vercel.app/api"
    : "http://localhost:3001/api";

function UseDoenca() {
  const [loading, setLoading] = useState<boolean>(false);
  const [callBack, setCallBack] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<
    "success" | "error" | "warning" | "info"
  >("info");

  const logPdf = async () => {
    setLoading(true);
    try {
      await axios.get<IDoenca[]>(`${baseURL}/log`);
    } catch (error) {
      console.error("Erro ao gerar pdf:", error);
    } finally {
      setLoading(false);
    }
  };

  const list = async () => {
    setLoading(true);
    try {
      const response = await axios.get<IDoenca[]>(`${baseURL}/doenca`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar doenças:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDoencaById = async (id: string | undefined) => {
    setLoading(true);
    try {
      const response = await axios.get<IDoenca>(`${baseURL}/doenca/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar doença com ID ${id}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const getDiagnostico = async (sintomas: string[] | undefined) => {
    setLoading(true);
    try {
      const response = await axios.post<IDoenca[]>(
        `${baseURL}/doenca/diagnostico`,
        { sintomas }
      );
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar diagnostico:`, error);
    } finally {
      setLoading(false);
    }
  };

  const createDoenca = async (newDoenca: IFormDoenca) => {
    setLoading(true);
    try {
      const response = await axios.post<IFormDoenca>(
        `${baseURL}/doenca`,
        newDoenca
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao criar doença:", error);
      const message = axios.isAxiosError(error)
        ? error.response?.data?.error || "Erro desconhecido"
        : "Erro desconhecido";
      setCallBack(message);
      setAlertType("error");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateDoenca = async (updatedDoenca: IDoenca) => {
    setLoading(true);
    try {
      const response = await axios.put<IDoenca>(
        `${baseURL}/doenca/${updatedDoenca.id}`,
        updatedDoenca
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar doença:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteDoenca = async (id: number) => {
    setLoading(true);
    try {
      const response = await axios.delete(`${baseURL}/doenca/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar doenças:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    list,
    getDoencaById,
    createDoenca,
    updateDoenca,
    deleteDoenca,
    callBack,
    alertType,
    getDiagnostico,
    logPdf,
  };
}

export default UseDoenca;
