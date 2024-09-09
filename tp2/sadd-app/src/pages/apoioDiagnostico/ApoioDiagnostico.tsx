import { Box, Button, CircularProgress, Typography } from "@mui/material";
import UseDoenca from "../../modules/doenca/api/doencaApi";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "../../ui/layout";
import { LoadingContainer, EsperandoSintomas } from "./ApoioDiagnosticoStyles";
import { useEffect, useState } from "react";
import UseSintoma from "../../modules/sintoma/api/sintomaApi";
import { SelectVarios, TableLayoutDoenca } from "../../ui/components";
import { IDoenca } from "../../libs/typings";

const ApoioDiagnostico = () => {
  const { loading: loadingDoencas, getDiagnostico } = UseDoenca();
  const { listAll, loading: loadingSintomas } = UseSintoma();
  const [listaSintomas, setListaSintomas] = useState<string[]>();
  const [response, setResponse] = useState<IDoenca[] | undefined>();
  const [sintomasSelecionados, setSintomasSelecionados] = useState<string[]>(
    []
  );

  useEffect(() => {
    const getSintomasFromBack = async () => {
      try {
        const sintomasFromBack = await listAll();
        setListaSintomas(sintomasFromBack);
      } catch (error) {
        console.error("Erro ao buscar sintomas:", error);
      }
    };
    getSintomasFromBack();
  }, []);

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
      <Button variant="contained" color="primary" onClick={onSubmit}>
        Verificar doenças
      </Button>
    </Box>
  );

  const searchsOption = (
    <Box sx={{ maxWidth: "70%", width: "100%" }}>
      <SelectVarios
        label="Lista de sintomas"
        names={listaSintomas}
        valueComponent={sintomasSelecionados}
        setValueComponent={setSintomasSelecionados}
      />
    </Box>
  );

  return (
    <PageLayout
      titleComponent={
        <Typography variant="h5">Apoio ao Diagnóstico</Typography>
      }
      onBack={() => {
        navigate(-1);
      }}
      searchs={searchsOption}
      actions={acoes}
    >
      {loadingDoencas || loadingSintomas ? (
        <LoadingContainer>
          <CircularProgress />
          <Typography variant="body1">
            Aguarde, carregando informações...
          </Typography>
        </LoadingContainer>
      ) : response ? (
        <TableLayoutDoenca todolist={response} />
      ) : (
        <EsperandoSintomas>
          <Typography variant="h6">Selecione os sintomas!</Typography>
        </EsperandoSintomas>
      )}
    </PageLayout>
  );

  async function onSubmit() {
    try {
      const responseBack = await getDiagnostico(sintomasSelecionados);
      setResponse(responseBack);
      console.log(responseBack);
    } catch (error) {}
  }
};

export default ApoioDiagnostico;
