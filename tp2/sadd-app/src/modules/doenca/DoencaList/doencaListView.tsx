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

const DoencaListView = () => {
  const { todoList, loading, onAdd } = useContext(DoencaListControllerContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const pesquisarDoencas = todoList.filter((doenca) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      doenca.nome_tecnico.toLowerCase().includes(searchLower) ||
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
      <Button variant="contained" color="primary" onClick={onAdd}>
        Cadastrar Doença
      </Button>
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
