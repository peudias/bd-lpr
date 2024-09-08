import { useContext } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { SintomaListControllerContext } from "./sintomaControllerList";
import { LoadingContainer } from "./sintomaListViewStyle";
import { PageLayout } from "../../../ui/layout";
import { TableLayoutSintomas } from "../../../ui/components";
import { useNavigate } from "react-router-dom";

const SintomaListView = () => {
  const { todoList, loading, onAdd, doenca } = useContext(
    SintomaListControllerContext
  );

  const navigate = useNavigate();

  const acoes = (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        gap: 2,
        marginTop: "16px",
        marginBottom: "24px",
      }}
    >
      <Button variant="contained" color="primary" onClick={onAdd}>
        Cadastrar Sintomas
      </Button>
    </Box>
  );

  return (
    <PageLayout
      titleComponent={
        <Typography variant="h5">
          {doenca
            ? `Sintomas de ${doenca.nomes_tecnicos} (${doenca.CID})`
            : "Sintomas"}
        </Typography>
      }
      onBack={() => {
        navigate(`/doenca/view`);
      }}
      actions={acoes}
    >
      {loading ? (
        <LoadingContainer>
          <CircularProgress />
          <Typography variant="body1">
            Aguarde, carregando informações...
          </Typography>
        </LoadingContainer>
      ) : todoList.length === 0 ? (
        <LoadingContainer>
          <Typography
            variant="h6"
            sx={{ paddingTop: { xs: "20px", sm: "60px" } }}
          >
            Essa doença ainda não possui sintomas.
          </Typography>
          <Typography variant="h6">Cadastre novos quando quiser!</Typography>
        </LoadingContainer>
      ) : (
        <TableLayoutSintomas todolist={todoList} />
      )}
    </PageLayout>
  );
};

export default SintomaListView;
