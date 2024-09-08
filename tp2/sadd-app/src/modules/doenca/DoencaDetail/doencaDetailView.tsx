import { useContext } from "react";
import {
  LoadingContainer,
  DoencaDetailStyles,
  Left,
} from "./doencaDetailViewStyle";
import { DoencaDetailControllerContext } from "./doencaDetailController";
import { Box, Button, CircularProgress, MenuItem } from "@mui/material";
import { DoencaModuleContext } from "../doencaContainer";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { PageLayout } from "../../../ui/layout";
import { useNavigate } from "react-router-dom";
import React from "react";
import {
  SelectForm,
  SelectGrupoNomePopular,
  AlertComponent,
} from "../../../ui/components/index";
import { useForm, Controller } from "react-hook-form";
import { INomesPopulares } from "../../../libs/typings";

export type IFormDoenca = {
  patogeno: string;
  CID: string;
  nome_tecnico: string;
  nomes_populares: string[];
};

const DoencaDetailView = () => {
  const { state } = useContext(DoencaModuleContext);
  const { patogenos, loading, onCreate, callBack, typeAlert } = useContext(
    DoencaDetailControllerContext
  );
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormDoenca>({
    defaultValues: {
      patogeno: "",
      CID: "",
      nome_tecnico: "",
      nomes_populares: [],
    },
  });

  const navigate = useNavigate();

  const [patogenoid, setPatogenoid] = React.useState<string>("");
  const [nomesPopulares, setNomesPopulares] = React.useState<INomesPopulares[]>(
    []
  );

  return (
    <PageLayout
      titleComponent={
        <Box>
          <Typography variant="h5">
            {state === "create" ? "Criar doença" : "Editar doença"}
          </Typography>
        </Box>
      }
      onBack={() => navigate(-1)}
    >
      {loading ? (
        <LoadingContainer>
          <CircularProgress />
          <Typography variant="body1">
            Aguarde, carregando informações...
          </Typography>
        </LoadingContainer>
      ) : (
        <Left>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={DoencaDetailStyles.formContent}>
              <Box sx={DoencaDetailStyles.formFirstLine}>
                <TextField
                  label="CID"
                  type="text"
                  {...register("CID", { required: "Campo obrigatório" })}
                  error={!!errors.CID}
                  helperText={errors.CID?.message}
                  sx={DoencaDetailStyles.inputText}
                />
                <Controller
                  name="patogeno"
                  control={control}
                  rules={{ required: "Campo obrigatório" }}
                  render={({ field }) => (
                    <SelectForm
                      name="patogeno"
                      label="Patógeno"
                      value={field.value}
                      handleChange={(event) =>
                        field.onChange(event.target.value)
                      }
                      sx={DoencaDetailStyles.inputText}
                      error={errors.patogeno}
                    >
                      {patogenos?.map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                          {item.nome_cientifico}
                        </MenuItem>
                      ))}
                    </SelectForm>
                  )}
                />
              </Box>
              <TextField
                label="Nome Técnico"
                type="text"
                {...register("nome_tecnico", { required: "Campo obrigatório" })}
                error={!!errors.nome_tecnico}
                helperText={errors.nome_tecnico?.message}
              />
              <SelectGrupoNomePopular
                readOnly={false}
                value={nomesPopulares}
                setValue={setNomesPopulares}
                label="Nomes polulares já selecionados: "
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                sx={DoencaDetailStyles.buttonSave}
              >
                Salvar
              </Button>
            </Box>
          </form>
          {callBack && <AlertComponent type={typeAlert} menssage={callBack} />}
        </Left>
      )}
    </PageLayout>
  );

  function onSubmit(data: IFormDoenca) {
    data.nomes_populares = nomesPopulares.map((item) => {
      return item.nome as string;
    });
    console.log(data);
    onCreate(data);
    navigate("/doenca/view");
  }
};

export default DoencaDetailView;
