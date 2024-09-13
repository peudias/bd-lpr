import { Box, Button, CircularProgress, Typography } from "@mui/material";
import UseDoenca from "../../modules/doenca/api/doencaApi";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "../../ui/layout";
import { LoadingContainer, EsperandoSintomas } from "./ApoioDiagnosticoStyles";
import { useEffect, useState } from "react";
import UseSintoma from "../../modules/sintoma/api/sintomaApi";
import { SelectVarios, TableLayoutDoenca } from "../../ui/components";
import { IDoenca } from "../../libs/typings";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ApoioDiagnostico = () => {
  const { loading: loadingDoencas, getDiagnostico, logPdf } = UseDoenca();
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

  const acoes = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        marginTop: "16px",
        marginBottom: "24px",
        width: "100%",
      }}
    >
      <Button variant="contained" color="primary" onClick={onSubmit}>
        Verificar Doenças
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => gerarRelatorioPDF(response)}
        disabled={!response}
      >
        Gerar Relatório
      </Button>
    </Box>
  );

  return (
    <PageLayout
      titleComponent={
        <Typography variant="h5">Apoio ao Diagnóstico</Typography>
      }
      onBack={() => {
        navigate("/home");
      }}
    >
      {searchsOption}
      {acoes}
      {loadingDoencas || loadingSintomas ? (
        <LoadingContainer>
          <CircularProgress />
          <Typography variant="body1">
            Aguarde, carregando informações...
          </Typography>
        </LoadingContainer>
      ) : response ? (
        <TableLayoutDoenca todolist={response} path="/apoio/diagnostico" />
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
    } catch (error) {
      console.error("Erro ao buscar diagnóstico:", error);
    }
  }

  function gerarRelatorioPDF(doencas: IDoenca[] | undefined) {
    if (!doencas) return;

    const doc = new jsPDF();
    const agora = new Date();
    const dataAtual = agora.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const horaAtual = agora.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    doc.text(
      `Relatório de Diagnóstico - Horário da impressão: ${dataAtual} às ${horaAtual}`,
      20,
      20
    );

    const body = doencas.map((doenca) => [
      doenca.nomes_tecnicos,
      doenca.CID,
      doenca.patogeno.nome_cientifico,
      doenca.patogeno.tipo,
      doenca.nomes_populares?.join(", ") || "Nenhum",
      doenca.sintomas?.map((sintoma) => sintoma.nome).join(", ") || "Nenhum",
      doenca.sintomas
        ?.map((sintoma) => sintoma.nivel_de_ocorrencia)
        .join(", ") || "Nenhum",
    ]);

    doc.autoTable({
      startY: 30,
      head: [
        [
          "Nome Técnico",
          "CID",
          "Patógeno",
          "Tipo de Patógeno",
          "Nomes Populares",
          "Sintomas",
          "Nível de Ocorrência",
        ],
      ],
      body: body,
      headStyles: {
        fillColor: [70, 129, 139],
      },
    });

    const dataHoraFormatada = `${agora
      .toLocaleDateString("pt-BR")
      .replace(/\//g, "-")}_${agora.getHours()}-${agora.getMinutes()}`;

    doc.save(`relatorio_diagnostico_${dataHoraFormatada}.pdf`);
    logPdfDoenca();
  }

  async function logPdfDoenca() {
    try {
      await logPdf();
    } catch (error) {
      console.error("Erro ao registrar log de PDF:", error);
    }
  }
};

export default ApoioDiagnostico;
