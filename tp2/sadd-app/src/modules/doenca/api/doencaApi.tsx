import axios from "axios";
import { IDoenca } from "../../../libs/typings";
import { useState } from "react";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://meusadd-back.vercel.app/api"
    : "http://localhost:3001/api";

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log(baseURL);

function UseDoenca() {
  const [loading, setLoading] = useState<boolean>(false);

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

  const getDoencaById = async (id: number) => {
    setLoading(true);
    try {
      const response = await axios.get<IDoenca>(`${baseURL}/doenca`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar doença com ID ${id}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const createDoenca = async (newDoenca: IDoenca) => {
    setLoading(true);
    try {
      const response = await axios.post<IDoenca>(
        `${baseURL}/doenca`,
        newDoenca
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao criar doença:", error);
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
  };
}

export default UseDoenca;
