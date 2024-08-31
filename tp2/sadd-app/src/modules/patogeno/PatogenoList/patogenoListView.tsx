import React from "react";
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
import PageLayout from "../../../ui/layout/pageLayout/PageLayout";
import { useNavigate } from "react-router-dom";
import { TableLayout } from "../../../ui/components";
import { IPatogeno } from "../../../libs/typings";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

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

  const mappedTodoList = todoList.map((item: IPatogeno) => ({
    id: item.id,
    nome: item.nome_cientifico,
    categoria: item.tipo,
  }));

  const searchsOption = (
    <Box sx={{ maxWidth: "360px", width: "100%" }}>
      <TextField
        sx={{ width: "100%" }}
        id="search-patogeno"
        label="Pesquisar"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ mr: 1 }}>
              <SearchOutlinedIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );

  const buttonsOption = (
    <Box>
      <Button
        onClick={() => onAdd()}
        sx={{ minWidth: "100%" }}
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
        <TableLayout
          todolist={mappedTodoList}
          editPath="patogeno"
          deletePath="deletePath"
        />
      ) : (
        <Typography variant="body1">Nenhum patógeno encontrado.</Typography>
      )}
    </PageLayout>
  );
};

export default PatogenoListView;
