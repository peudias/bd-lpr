import { SxProps } from "@mui/system";

export interface IPatogeno {
  id: number;
  nome_cientifico: string;
  tipo: string;
}

export interface IDoenca {
  id: number;
  patogeno_id: number;
  CID: string;
  nomes_tecnicos: string;
  nomes_populares: string;
}

export interface ISxStyleObject {
  [key: string]: SxProps;
}
