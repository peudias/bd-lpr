import { SxProps } from "@mui/system";

export interface IPatogeno {
  id: number;
  nome_cientifico: string;
  tipo: string;
}

export interface ISxStyleObject {
  [key: string]: SxProps;
}
