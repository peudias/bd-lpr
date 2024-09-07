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
import { IPatogeno } from "../../../libs/typings";

interface ITable {
  todolist: Array<IPatogeno>;
}

export const TableLayoutPatogeno: React.FC<ITable> = ({ todolist }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Tipo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todolist.map((item) => (
            <TableRow key={item?.id}>
              <TableCell>{item.nome_cientifico}</TableCell>
              <TableCell>{item.tipo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
