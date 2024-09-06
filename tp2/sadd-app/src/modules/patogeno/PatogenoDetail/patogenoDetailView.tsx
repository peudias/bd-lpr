import { useContext, useEffect, useMemo, useState } from "react";
import { LoadingContainer } from "./patogenoDetailViewStyle";
import { PatogenoDetailControllerContext } from "./patogenoDetailController";
import Typography from "@mui/material/Typography";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { PatogenoModuleContext } from "../patogenoContainer";
import { PageLayout } from "../../../ui/layout";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

type FormPatogenoValues = {
  nome_cientifico: string;
  tipo: string;
};

const PatogenoDetailView = () => {
  const { document, loading } = useContext(PatogenoDetailControllerContext);
  const { state } = useContext(PatogenoModuleContext);
  const form = useForm<FormPatogenoValues>({
    defaultValues: {
      nome_cientifico: "",
      tipo: "",
    },
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
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

  return (
    <PageLayout
      titleComponent={
        <Box>
          <Typography variant="h5">
            {state === "create" ? "Criar patógeno" : "Editar patógeno"}
          </Typography>
        </Box>
      }
      onBack={() => {
        navigate(-1);
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Nome Científico"
          type="text"
          {...register("nome_cientifico", { required: "Campo obrigatório" })}
          error={!!errors.nome_cientifico}
          helperText={errors.nome_cientifico?.message}
        />
        <TextField
          label="Tipo"
          type="text"
          {...register("tipo", { required: "Campo obrigatório" })}
          error={!!errors.tipo}
          helperText={errors.tipo?.message}
        />
        <Button type="submit" color="primary" variant="contained">
          Salvar
        </Button>
      </form>
    </PageLayout>
  );

  function onSubmit(data: FormPatogenoValues) {
    console.log(data);
  }
};

export default PatogenoDetailView;
