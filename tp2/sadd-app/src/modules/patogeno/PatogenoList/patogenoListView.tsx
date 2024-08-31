import React from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { PatogenoListControllerContext } from "./patogenoControllerList";
import { LoadingContainer } from "./patogenoListViewStyle";
import PageLayout from "../../../ui/layout/pageLayout/PageLayout";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { TableLayout } from "../../../ui/components";

const PatogenoListView = () => {
  const { todoList, loading, onAdd } = React.useContext(
    PatogenoListControllerContext
  );
  const navigate = useNavigate();

  if (loading) {
    return (
      <LoadingContainer>
        <CircularProgress />
        <Typography variant="body1">
          Aguarde, carregando informações...
        </Typography>
      </LoadingContainer>
    );
  }

  const searchsOption = (
    <Box sx={{ maxWidth: "360px", width: "100%" }}>
      <TextField
        sx={{ width: "100%" }}
        id="search-patogeno"
        label="Pesquisar por nome"
        variant="outlined"
      />
    </Box>
  );

  const buttonsOption = (
    <Box>
      <Button
        onClick={() => onAdd()}
        sx={{ minWidth: "180px" }}
        variant="contained"
      >
        Criar Patógeno
      </Button>
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
      searchs={searchsOption}
      actions={buttonsOption}
      onBack={() => {}}
    >
      {todoList && todoList.length > 0 ? (
        <TableLayout todolist={todoList}></TableLayout>
      ) : (
        <Typography variant="body1">Nenhum patógeno encontrado.</Typography>
      )}
    </PageLayout>
  );
};

export default PatogenoListView;
