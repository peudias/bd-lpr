import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

interface ITable {
  todolist: Array<{
    id: number;
    nome: string;
    categoria: string;
  }>;
  editPath: string;
  deletePath: string;
}

export const TableLayout: React.FC<ITable> = ({
  todolist,
  editPath,
  deletePath,
}) => {
  const navigate = useNavigate();

  const handleEdit = (id: number) => {
    navigate(`/${editPath}/edit/${id}`);
  };

  const handleDelete = (id: number) => {
    navigate(`/${deletePath}/delete/${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todolist.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.nome}</TableCell>
              <TableCell>{item.categoria}</TableCell>
              <TableCell>
                <Button variant="text" onClick={() => handleEdit(item.id)}>
                  <ModeEditOutlineOutlinedIcon />
                </Button>
                <Button variant="text" onClick={() => handleDelete(item.id)}>
                  <DeleteOutlinedIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
