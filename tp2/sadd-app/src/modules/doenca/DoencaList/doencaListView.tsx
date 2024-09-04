import React, { useState, useContext } from "react";
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { DoencaListControllerContext } from "./doencaControllerList";
import { SintomaListControllerContext } from "../../sintoma/SintomaList/sintomaControllerList";
import { LoadingContainer } from "./doencaListViewStyle";
import { IDoenca, ISintoma } from "../../../libs/typings";
import { useNavigate } from "react-router-dom";

const DoencaListView: React.FC = React.memo(() => {
  const { todoList: doencaToDoList, loading: doencaLoading } = useContext(
    DoencaListControllerContext
  );
  const { todoList: sintomaToDoList, loading: sintomaLoading } = useContext(
    SintomaListControllerContext
  );
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const listaDeDoencas: IDoenca[] = Array.isArray(doencaToDoList)
    ? doencaToDoList
    : [];
  const listaDeSintomas: ISintoma[] = Array.isArray(sintomaToDoList)
    ? sintomaToDoList
    : [];

  const listaDeDoencasComSintomas = listaDeDoencas.map((doenca) => ({
    ...doenca,
    sintomas: listaDeSintomas.filter(
      (sintoma) => sintoma.doenca_id === doenca.id
    ),
  }));

  const filteredDoencas = listaDeDoencasComSintomas.filter((doenca) => {
    return (
      doenca.nomes_tecnicos?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doenca.nomes_populares
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      doenca.CID?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doenca.patogeno_id?.toString().includes(searchTerm)
    );
  });

  const generatePDF = () => {
    const doc = new jsPDF();

    const currentDate = new Date();
    const dateStr = currentDate.toLocaleDateString();
    const timeStr = currentDate.toLocaleTimeString();

    doc.setFontSize(18);
    doc.text("Relatório de Doenças", 14, 22);

    doc.setFontSize(12);
    doc.text(`Data da impressão: ${dateStr} às ${timeStr}`, 14, 30);

    doc.autoTable({
      head: [
        ["Nome Técnico", "Nome Popular", "CID", "Patógeno ID", "Sintomas"],
      ],
      body: filteredDoencas.map((doenca) => [
        doenca.nomes_tecnicos || "N/A",
        doenca.nomes_populares || "N/A",
        doenca.CID || "N/A",
        doenca.patogeno_id || "N/A",
        doenca.sintomas?.map((sintoma) => sintoma.nome).join(", ") || "N/A",
      ]),
      startY: 40,
    });

    doc.save("relatorio_de_doencas.pdf");
  };

  const handleCadastrarDoenca = () => {
    navigate("/doenca/create");
  };

  if (doencaLoading || sintomaLoading) {
    return (
      <LoadingContainer>
        <CircularProgress />
        <Typography variant="body1">
          Aguarde, carregando informações...
        </Typography>
      </LoadingContainer>
    );
  }

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h6" sx={{ marginBottom: "16px" }}>
        Pesquisar doenças
      </Typography>
      <TextField
        label="Pesquisar"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          gap: 2,
          marginTop: "16px",
          marginBottom: "24px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleCadastrarDoenca}
        >
          Cadastrar Doença
        </Button>
        <Button variant="contained" color="primary" onClick={generatePDF}>
          Gerar PDF
        </Button>
      </Box>
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
            {filteredDoencas.map((doenca) => (
              <TableRow key={doenca.id}>
                <TableCell component="th" scope="row">
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>
                        {doenca.nomes_tecnicos || "Nome técnico não disponível"}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Nome Popular:{" "}
                        {doenca.nomes_populares ||
                          "Nome popular não disponível"}
                      </Typography>
                      <Typography>
                        Patógeno ID:{" "}
                        {doenca.patogeno_id || "Patógeno não disponível"}
                      </Typography>
                      <Typography>
                        Sintomas:{" "}
                        {doenca.sintomas
                          ?.map((sintoma) => sintoma.nome)
                          .join(", ") || "Sintomas não disponíveis"}
                      </Typography>
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
      {filteredDoencas.length === 0 && (
        <Typography variant="body1" sx={{ marginTop: "16px" }}>
          Nenhuma doença encontrada.
        </Typography>
      )}
    </Box>
  );
});

export default DoencaListView;
