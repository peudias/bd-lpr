import { useContext } from "react";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import { DoencaListControllerContext } from "./doencaControllerList";
import { LoadingContainer } from "./doencaListViewStyle";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "../../../ui/layout";
import { TableLayoutDoenca } from "../../../ui/components";

const DoencaListView = () => {
  const { todoList, loading, onAdd } = useContext(DoencaListControllerContext);

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
        <TableLayoutDoenca todolist={todoList}></TableLayoutDoenca>
      )}
    </PageLayout>
  );
};

export default DoencaListView;
