import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { ISintoma } from "../../../libs/typings";

interface ITableSintoma {
  todolist: Array<ISintoma>;
}

export const TableLayoutSintomas: React.FC<ITableSintoma> = ({ todolist }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Nível de ocorrência</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todolist.map((item) => (
            <TableRow key={item?.id}>
              <TableCell>{item.nome}</TableCell>
              <TableCell>{item.nivel_de_ocorrencia}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
