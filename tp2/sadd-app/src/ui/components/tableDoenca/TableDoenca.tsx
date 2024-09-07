import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  AccordionSummary,
  Accordion,
  AccordionDetails,
  Button,
} from "@mui/material";
import { IDoenca } from "../../../libs/typings";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";

interface ITable {
  todolist: Array<IDoenca>;
}

export const TableLayoutDoenca: React.FC<ITable> = ({ todolist }) => {
  const navigate = useNavigate();
  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: "100%", overflowX: "auto", padding: "16px" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome Técnico</TableCell>
            <TableCell align="center">Sintomas</TableCell>
            <TableCell align="right">CID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todolist.map((doenca) => (
            <TableRow key={doenca.id}>
              <TableCell component="th" scope="row">
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>
                      {doenca.nome_tecnico || "Nome técnico não disponível"}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Nome Popular:{" "}
                      {doenca.nomes_populares
                        ? doenca.nomes_populares.join(", ")
                        : "Não possui nenhum"}
                    </Typography>
                    <Typography>
                      Patógeno: {doenca.patogeno.nome_cientifico} -{" "}
                      {doenca.patogeno.tipo}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </TableCell>
              <TableCell align="center">
                <Button
                  onClick={() => {
                    navigate(`/sintoma/view/${doenca.id}`);
                  }}
                >
                  ACESSAR
                </Button>
              </TableCell>
              <TableCell align="right">
                {doenca.CID || "CID não disponível"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
