import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import { PatogenoListControllerContext } from "./patogenoControllerList";
import { LoadingContainer } from "./patogenoListViewStyle";
import { PageLayout } from "../../../ui/layout/pageLayout/PageLayout";
import { TableLayoutPatogeno } from "../../../ui/components";
import jsPDF from "jspdf";
import "jspdf-autotable";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import UsePatogeno from "../api/patogenoApi";
import { useNavigate } from "react-router-dom";

const PatogenoListView = () => {
  const navigate = useNavigate();
  const { todoList, loading, onAdd } = useContext(
    PatogenoListControllerContext
  );
  const [searchTerm, setSearchTerm] = useState("");
  const { logPdf } = UsePatogeno();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredTodoList = todoList.filter(
    (item) =>
      item.nome_cientifico.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      `Relatório de Patógenos - Horário da impressão: ${dataAtual} às ${horaAtual}`,
      20,
      20
    );

    const body = filteredTodoList.map((patogeno) => [
      patogeno.nome_cientifico,
      patogeno.tipo,
    ]);

    doc.autoTable({
      startY: 30,
      head: [["Nome Científico", "Tipo"]],
      body: body,
      headStyles: {
        fillColor: [70, 129, 139],
      },
    });

    const dataHoraFormatada = `${agora
      .toLocaleDateString("pt-BR")
      .replace(/\//g, "-")}_${agora.getHours()}-${agora.getMinutes()}`;

    doc.save(`relatorio_patogenos_${dataHoraFormatada}.pdf`);
    logPdfPatogeno();
  };

  const buttonsOption = (
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
        label="Pesquisar"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ marginBottom: "16px", flex: 1 }}
      />
      <Box sx={{ display: "flex", gap: "8px" }}>
        <Button onClick={() => onAdd()} variant="contained" color="primary">
          Cadastrar Patógeno
        </Button>
        <Button onClick={gerarRelatorioPDF} variant="contained" color="primary">
          Gerar Relatório
        </Button>
      </Box>
    </Box>
  );

  const titlePage = (
    <Box>
      <Typography variant="h5">Patógenos</Typography>
    </Box>
  );

  return (
    <PageLayout
      key={"PatogenoPageLayoutListKEY"}
      titleComponent={titlePage}
      actions={buttonsOption}
      onBack={() => {
        navigate(`/home`);
      }}
    >
      {loading ? (
        <LoadingContainer>
          <CircularProgress />
          <Typography variant="body1">
            Aguarde, carregando informações...
          </Typography>
        </LoadingContainer>
      ) : filteredTodoList.length > 0 ? (
        <TableLayoutPatogeno todolist={filteredTodoList} />
      ) : (
        <Typography variant="body1">Nenhum patógeno encontrado.</Typography>
      )}
    </PageLayout>
  );

  async function logPdfPatogeno() {
    try {
      await logPdf();
    } catch (error) {}
  }
};

export default PatogenoListView;
