import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import { DoencaListControllerContext } from "./doencaControllerList";
import { LoadingContainer } from "./doencaListViewStyle";
import PageLayout from "../../../ui/layout/pageLayout/PageLayout";
import { useNavigate } from "react-router-dom";
import { TableLayout } from "../../../ui/components";
import { IDoenca } from "../../../libs/typings";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const DoencaListView = () => {
  const { todoList, loading, onAdd } = React.useContext(
    DoencaListControllerContext
  );

  console.log("todolist", todoList);

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
    .map((item: IDoenca) => ({
      id: item.id,
      nome: item.nomes_tecnicos,
      categoria: item.CID,
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
        id="search-doenca"
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
        Cadastrar Doença
      </Button>
    </Box>
  );

  const titlePage = (
    <Box>
      <Typography variant="h5">Doenças</Typography>
    </Box>
  );

  return (
    <PageLayout
      key={"DoencaPageLayoutListKEY"}
      titleComponent={titlePage}
      searchs={searchsOption}
      actions={buttonsOption}
      onBack={() => {}}
    >
      {filteredTodoList.length > 0 ? (
        <TableLayout
          todolist={filteredTodoList}
          editPath="doenca"
          deletePath="deletePath"
        />
      ) : (
        <Typography variant="body1">Nenhuma doença encontrada.</Typography>
      )}
    </PageLayout>
  );
};

export default DoencaListView;
