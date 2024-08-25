import { SxProps } from "@mui/system";

export interface IPatogeno {
  id: number | undefined;
  nome_cientifico: string;
  tipo: string;
}

export interface ISxStyleObject {
  [key: string]: SxProps;
}
