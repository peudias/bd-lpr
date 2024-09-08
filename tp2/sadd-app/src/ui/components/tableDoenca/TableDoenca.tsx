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
  useTheme,
} from "@mui/material";
import { IDoenca } from "../../../libs/typings";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";

interface ITable {
  todolist: Array<IDoenca>;
}

export const TableLayoutDoenca: React.FC<ITable> = ({ todolist }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: "100%", overflowX: "auto", padding: "16px" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome Técnico</TableCell>
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
                    aria-controls={`panel-${doenca.id}-content`}
                    id={`panel-${doenca.id}-header`}
                  >
                    <Typography>
                      {doenca.nome_tecnico || "Nome técnico não disponível"}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ color: theme.palette.primary.main }}>
                      Nome Popular:{" "}
                      {doenca.nomes_populares &&
                      doenca.nomes_populares.length > 0
                        ? doenca.nomes_populares.join(", ")
                        : "Não possui nenhum"}
                    </Typography>
                    <Typography sx={{ color: theme.palette.primary.main }}>
                      Patógeno: {doenca.patogeno.nome_cientifico} -{" "}
                      {doenca.patogeno.tipo}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{ marginTop: "8px" }}
                      onClick={() => navigate(`/sintoma/view/${doenca.id}`)}
                    >
                      Acessar Sintomas
                    </Button>
                  </AccordionDetails>
                </Accordion>
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
