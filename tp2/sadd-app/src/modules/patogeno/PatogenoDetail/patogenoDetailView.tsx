import { useContext, useEffect, useMemo, useState } from "react";
import {
  LoadingContainer,
  Center,
  PatogenoDetailStyles,
} from "./patogenoDetailViewStyle";
import { PatogenoDetailControllerContext } from "./patogenoDetailController";
import Typography from "@mui/material/Typography";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { PatogenoModuleContext } from "../patogenoContainer";
import { PageLayout } from "../../../ui/layout";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IPatogeno } from "../../../libs/typings";

const PatogenoDetailView = () => {
  const { document, loading, onCreate } = useContext(
    PatogenoDetailControllerContext
  );
  const { state } = useContext(PatogenoModuleContext);
  const form = useForm<IPatogeno>({
    defaultValues: {
      nome_cientifico: "",
      tipo: "",
    },
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const navigate = useNavigate();
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
        navigate(`/patogeno/view`);
      }}
    >
      <Center>
        {loading ? (
          <LoadingContainer>
            <CircularProgress />
            <Typography variant="body1">
              Aguarde, carregando informações...
            </Typography>
          </LoadingContainer>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={PatogenoDetailStyles.formContent}>
              <TextField
                label="Nome Científico"
                type="text"
                {...register("nome_cientifico", {
                  required: "Campo obrigatório",
                })}
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
            </Box>
          </form>
        )}
      </Center>
    </PageLayout>
  );

  function onSubmit(data: IPatogeno) {
    onCreate(data);
    navigate("/patogeno/view");
  }
};

export default PatogenoDetailView;
