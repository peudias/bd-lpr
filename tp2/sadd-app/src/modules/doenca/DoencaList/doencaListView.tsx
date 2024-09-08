import { useContext, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { DoencaListControllerContext } from "./doencaControllerList";
import { LoadingContainer } from "./doencaListViewStyle";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "../../../ui/layout";
import { TableLayoutDoenca } from "../../../ui/components";
import jsPDF from "jspdf";
import "jspdf-autotable";

const DoencaListView = () => {
  const { todoList, loading, onAdd } = useContext(DoencaListControllerContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const gerarRelatorioPDF = () => {
    const doc = new jsPDF();

    const agora = new Date();
    const dataAtual = agora.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const horaAtual = agora.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    doc.text(
      `Relatório de Doenças - Hora da impressão: ${dataAtual} às ${horaAtual}`,
      20,
      20
    );

    const body = todoList.map((doenca) => [
      doenca.nomes_tecnicos,
      doenca.CID,
      doenca.patogeno.nome_cientifico,
      doenca.patogeno.tipo,
      doenca.nomes_populares?.join(", ") || "Nenhum",
    ]);

    doc.autoTable({
      startY: 30,
      head: [
        [
          "Nome Técnico",
          "CID",
          "Patógeno",
          "Tipo de Patógeno",
          "Nomes Populares",
        ],
      ],
      body: body,
    });

    const dataHoraFormatada = `${agora
      .toLocaleDateString("pt-BR")
      .replace(/\//g, "-")}_${agora.getHours()}-${agora.getMinutes()}`;

    doc.save(`relatorio_doencas_${dataHoraFormatada}.pdf`);
  };

  const pesquisarDoencas = todoList.filter((doenca) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      doenca.nomes_tecnicos.toLowerCase().includes(searchLower) ||
      doenca.CID.toLowerCase().includes(searchLower) ||
      doenca.patogeno.nome_cientifico.toLowerCase().includes(searchLower) ||
      doenca.patogeno.tipo.toLowerCase().includes(searchLower) ||
      (Array.isArray(doenca.nomes_populares) &&
        doenca.nomes_populares.some((nomePopular) =>
          nomePopular.toLowerCase().includes(searchLower)
        ))
    );
  });

  const acoes = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginTop: "16px",
        marginBottom: "24px",
        width: "100%",
      }}
    >
      <TextField
        label="Pesquisar Doença"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginBottom: "16px", flex: 1 }}
      />
      <Box sx={{ display: "flex", gap: "8px" }}>
        <Button variant="contained" color="primary" onClick={onAdd}>
          Cadastrar Doença
        </Button>
        <Button variant="contained" color="primary" onClick={gerarRelatorioPDF}>
          Gerar Relatório
        </Button>
      </Box>
    </Box>
  );

  return (
    <PageLayout
      titleComponent={<Typography variant="h5">Doenças</Typography>}
      actions={acoes}
    >
      {loading ? (
        <LoadingContainer>
          <CircularProgress />
          <Typography variant="body1">
            Aguarde, carregando informações...
          </Typography>
        </LoadingContainer>
      ) : (
        <TableLayoutDoenca todolist={pesquisarDoencas}></TableLayoutDoenca>
      )}
    </PageLayout>
  );
};

export default DoencaListView;
