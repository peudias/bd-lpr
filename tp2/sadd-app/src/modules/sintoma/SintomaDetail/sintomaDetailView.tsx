import { useContext } from "react";
import { SintomaModuleContext } from "../sintomaContainer";
import { PatogenoDetailStyles } from "../../patogeno/PatogenoDetail/patogenoDetailViewStyle";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingContainer } from "./sintomaDetailViewStyle";
import { PageLayout } from "../../../ui/layout";
import { ISintoma } from "../../../libs/typings";
import { Center } from "../../patogeno/PatogenoDetail/patogenoDetailViewStyle";
import { SintomaDetailControllerContext } from "./sintomaDetailController";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SelectForm } from "../../../ui/components";

const SintomaDetailView = () => {
  const { onCreate, loading, doenca } = useContext(
    SintomaDetailControllerContext
  );
  const { state } = useContext(SintomaModuleContext);
  const form = useForm<ISintoma>({
    defaultValues: {
      nome: "",
      nivel_de_ocorrencia: "",
    },
  });
  const { register, handleSubmit, formState, control } = form;
  const { errors } = formState;
  const navigate = useNavigate();
  return (
    <PageLayout
      titleComponent={
        <Box>
          <Typography variant="h5">
            {state === "create"
              ? doenca
                ? `Criar sintoma para ${doenca.nomes_tecnicos} (${doenca.CID})`
                : `Criar novo sintoma`
              : doenca
              ? `Editar sintoma para ${doenca.nomes_tecnicos} (${doenca.CID})`
              : `Editar sintoma`}
          </Typography>
        </Box>
      }
      onBack={() => {
        navigate(`/sintoma/view/${doenca?.id}`);
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
                label="Nome"
                type="text"
                {...register("nome", {
                  required: "Campo obrigatório",
                })}
                error={!!errors.nome}
                helperText={errors.nome?.message}
              />
              <Controller
                name="nivel_de_ocorrencia"
                control={control}
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <SelectForm
                    name="nivel_de_ocorrencia"
                    label="Nível de ocorrência"
                    value={field.value}
                    handleChange={(event) => field.onChange(event.target.value)}
                    error={errors.nivel_de_ocorrencia}
                  >
                    <MenuItem
                      key={"menuItemFromCreateSintoma1"}
                      value={"Muito Comum"}
                    >
                      Muito Comum
                    </MenuItem>
                    <MenuItem
                      key={"menuItemFromCreateSintoma2"}
                      value={"Comum"}
                    >
                      Comum
                    </MenuItem>
                    <MenuItem
                      key={"menuItemFromCreateSintoma3"}
                      value={"Pouco Comum"}
                    >
                      Pouco Comum
                    </MenuItem>
                    <MenuItem key={"menuItemFromCreateSintoma4"} value={"Raro"}>
                      Raro
                    </MenuItem>
                    <MenuItem
                      key={"menuItemFromCreateSintoma5"}
                      value={"Muito Raro"}
                    >
                      Muito Raro
                    </MenuItem>
                  </SelectForm>
                )}
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

  function onSubmit(data: ISintoma) {
    onCreate(data);
    navigate(`/sintoma/view/${doenca?.id}`);
  }
};

export default SintomaDetailView;
