import React from "react";
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { PatogenoListControllerContext } from "./patogenoControllerList";
import { LoadingContainer } from "./patogenoListViewStyle";

const PatogenoListView = () => {
  const { todoList, loading } = React.useContext(PatogenoListControllerContext);
  console.log("LISTA DE PATOGENOS = ", todoList);
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

  return (
    <Box>
      <Typography variant="h6">Ver todos os patógenos</Typography>
      {todoList && todoList.length > 0 ? (
        <List>
          {todoList.map((patogeno) => (
            <ListItem key={patogeno.id}>
              <ListItemText
                primary={patogeno.nome_cientifico}
                secondary={`Tipo: ${patogeno.tipo}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1">Nenhum patógeno encontrado.</Typography>
      )}
    </Box>
  );
};

export default PatogenoListView;
