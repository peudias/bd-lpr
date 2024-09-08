import React, { useCallback } from "react";
import { INomesPopulares } from "../../../libs/typings";
import { Box, Button, TextField, Typography } from "@mui/material";
import AssignmentLateOutlinedIcon from "@mui/icons-material/AssignmentLateOutlined";
import {
  CardNoNomesPopulares,
  SelectGrupoNomesPopularesStyles,
} from "./SelectGrupoNomePopularStyle";
import { CardNomePopular } from "./components/CardNomePopular";

interface ISelectGrupoNomePopular {
  readOnly: boolean;
  value: INomesPopulares[];
  setValue: React.Dispatch<React.SetStateAction<INomesPopulares[]>>;
  label: string;
}

export const SelectGrupoNomePopular = ({
  readOnly,
  value,
  setValue,
  label,
}: ISelectGrupoNomePopular) => {
  const [nome, setNome] = React.useState<string>("");
  const [error, setError] = React.useState<string | undefined>(undefined);

  const handleAdicionar = React.useCallback(() => {
    if (nome === "") {
      setError("Campo obrigatório");
      return;
    }
    const newGrupo = [...value];
    const doc: INomesPopulares = {
      nome: nome,
    };
    if (!value.some((p) => p.nome === doc.nome)) {
      newGrupo.push(doc);
    }
    setValue(() => newGrupo);
    setError(undefined);
    setNome("");
  }, [nome]);

  if (readOnly) {
    // FAZER COMPONENTE
    //return ();
  }

  return (
    <Box sx={SelectGrupoNomesPopularesStyles.container}>
      <Box sx={SelectGrupoNomesPopularesStyles.containerSelecao}>
        <TextField
          sx={{ width: "100%" }}
          label="Nome popular"
          type="text"
          error={!!error}
          helperText={error}
          value={nome}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setNome(event.target.value);
          }}
        />
        <Button onClick={handleAdicionar}>{"Inserir"}</Button>
      </Box>
      <Box>
        <Typography variant="body2" sx={{ padding: "10px 0" }}>
          {label}
        </Typography>
        <Box sx={SelectGrupoNomesPopularesStyles.containerCard}>
          {value.length !== 0 ? (
            value.map((item, index) => (
              <CardNomePopular
                key={`cardNomesPopularesInDoencaCreat${index}`}
                doc={item}
                readOnly={false}
                onRemove={handleRemover}
              />
            ))
          ) : (
            <CardNoNomesPopulares>
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                }}
              >
                <AssignmentLateOutlinedIcon />
                <Typography variant="caption" sx={{ flex: 1 }}>
                  Nenhum nome popular selecionado
                </Typography>
              </Box>
            </CardNoNomesPopulares>
          )}
        </Box>
      </Box>
    </Box>
  );

  function handleRemover(nome: string) {
    const newGrupo = value.filter((p) => p.nome !== nome);
    setValue(newGrupo);
  }
};
