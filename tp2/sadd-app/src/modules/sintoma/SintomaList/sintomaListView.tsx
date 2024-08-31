import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import { SintomaListControllerContext } from "./sintomaControllerList";
import { LoadingContainer } from "./sintomaListViewStyle";
import PageLayout from "../../../ui/layout/pageLayout/PageLayout";
import { useNavigate } from "react-router-dom";
import { TableLayout } from "../../../ui/components";
import { ISintoma } from "../../../libs/typings";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const SintomaListView = () => {
  const { todoList, loading, onAdd } = React.useContext(
    SintomaListControllerContext
  );
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredTodoList = todoList
    .map((item: ISintoma) => ({
      id: item.id,
      nome: item.nome,
      categoria: item.nivel_de_ocorrencia,
    }))
    .filter(
      (item) =>
        item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const searchsOption = (
    <Box sx={{ maxWidth: "360px", width: "100%" }}>
      <TextField
        sx={{ width: "100%" }}
        id="search-sintoma"
        label="Pesquisar"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
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
        Criar Sintoma
      </Button>
    </Box>
  );

  const titlePage = (
    <Box>
      <Typography variant="h5">Sintomas</Typography>
    </Box>
  );

  return (
    <PageLayout
      key={"SintomaPageLayoutListKEY"}
      titleComponent={titlePage}
      searchs={searchsOption}
      actions={buttonsOption}
      onBack={() => {}}
    >
      {filteredTodoList.length > 0 ? (
        <TableLayout
          todolist={filteredTodoList}
          editPath="sintoma"
          deletePath="deletePath"
        />
      ) : (
        <Typography variant="body1">Nenhum sintoma encontrado.</Typography>
      )}
    </PageLayout>
  );
};

export default SintomaListView;
