import { SxProps } from "@mui/system";

export interface IPatogeno {
  id?: number;
  nome_cientifico: string;
  tipo: string;
}

export interface IDoenca {
  id?: number;
  patogeno: IPatogeno;
  CID: string;
  nomes_tecnicos: string;
  nomes_populares?: string[];
}

export interface INomesPopulares {
  doenca_id?: number;
  nome: string;
}

export interface ISintoma {
  id?: number;
  nome: string;
  nivel_de_ocorrencia:
    | "Muito Comum"
    | "Comum"
    | "Pouco Comum"
    | "Raro"
    | "Muito Raro";
}

export interface ISxStyleObject {
  [key: string]: SxProps;
}

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}
