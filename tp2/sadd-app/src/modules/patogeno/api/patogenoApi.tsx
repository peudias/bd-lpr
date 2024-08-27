import axios from "axios";
import { IPatogeno } from "../../../libs/typings";
import { useState } from "react";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://bd-lpr.vercel.app"
    : "http://localhost:3001/api";

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log(baseURL);

function UsePatogeno() {
  const [loading, setLoading] = useState<boolean>(false);

  const list = async () => {
    setLoading(true);
    try {
      const response = await axios.get<IPatogeno[]>(`${baseURL}/patogeno`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar patógenos:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPatogenoById = async (id: number) => {
    setLoading(true);
    try {
      const response = await axios.get<IPatogeno>(`${baseURL}/patogeno`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar patógeno com ID ${id}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const createPatogeno = async (newPatogeno: IPatogeno) => {
    setLoading(true);
    try {
      const response = await axios.post<IPatogeno>(
        `${baseURL}/patogeno`,
        newPatogeno
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao criar patógeno:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updatePatogeno = async (updatedPatogeno: IPatogeno) => {
    setLoading(true);
    try {
      const response = await axios.put<IPatogeno>(
        `${baseURL}/patogeno/${updatedPatogeno.id}`,
        updatedPatogeno
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar patógeno:", error);
    } finally {
      setLoading(false);
    }
  };

  const deletePatogeno = async (id: number) => {
    setLoading(true);
    try {
      const response = await axios.delete(`${baseURL}/patogeno/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar patógeno:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    list,
    getPatogenoById,
    createPatogeno,
    updatePatogeno,
    deletePatogeno,
  };
}

export default UsePatogeno;
