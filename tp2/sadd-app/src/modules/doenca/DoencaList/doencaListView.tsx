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
import { PageLayout } from "../../../ui/layout";
import { TableLayoutDoenca } from "../../../ui/components";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useNavigate } from "react-router-dom";
import UseDoenca from "../api/doencaApi";

const DoencaListView = () => {
  const navigate = useNavigate();
  const { todoList, loading, onAdd } = useContext(DoencaListControllerContext);
  const [searchTerm, setSearchTerm] = useState("");
  const { logPdf } = UseDoenca();

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
      `Relatório de Doenças - Horário da impressão: ${dataAtual} às ${horaAtual}`,
      20,
      20
    );

    const body = pesquisarDoencas.map((doenca) => [
      doenca.nomes_tecnicos,
      doenca.CID,
      doenca.patogeno.nome_cientifico,
      doenca.patogeno.tipo,
      doenca.nomes_populares?.join(", ") || "Nenhum",
      doenca.sintomas?.map((sintoma) => sintoma.nome).join(", ") || "Nenhum",
      doenca.sintomas
        ?.map((sintoma) => sintoma.nivel_de_ocorrencia)
        .join(", ") || "Nenhum",
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
          "Sintomas",
          "Nível de Ocorrência",
        ],
      ],
      body: body,
      headStyles: {
        fillColor: [70, 129, 139],
      },
    });

    const dataHoraFormatada = `${agora
      .toLocaleDateString("pt-BR")
      .replace(/\//g, "-")}_${agora.getHours()}-${agora.getMinutes()}`;

    doc.save(`relatorio_doencas_${dataHoraFormatada}.pdf`);
    logPdfDoenca();
  };

  const pesquisarDoencas = todoList.filter((doenca) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      doenca.nomes_tecnicos.toLowerCase().includes(searchLower) ||
      doenca.CID.toLowerCase().includes(searchLower) ||
      (Array.isArray(doenca.sintomas) &&
        doenca.sintomas.some((sintoma) =>
          sintoma.nome.toLowerCase().includes(searchLower)
        )) ||
      (Array.isArray(doenca.sintomas) &&
        doenca.sintomas.some((sintoma) =>
          sintoma.nivel_de_ocorrencia.toLowerCase().includes(searchLower)
        )) ||
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
      onBack={() => {
        navigate(`/doenca`);
      }}
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

  async function logPdfDoenca() {
    try {
      await logPdf();
    } catch (error) {}
  }
};

export default DoencaListView;
