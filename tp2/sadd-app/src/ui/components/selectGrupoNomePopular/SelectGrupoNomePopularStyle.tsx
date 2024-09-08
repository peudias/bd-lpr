import { Box, Card, styled } from "@mui/material";
import { ISxStyleObject } from "../../../libs/typings";

const CardNoNomesPopulares = styled(Card)(({ theme }) => ({
  width: `210px`,
  maxHeight: "110px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  padding: `16px`,
  gap: "16px",
  transition: "all 0.3s ease",
  [theme.breakpoints.down("sm")]: {
    paddingLeft: "16px",
    paddingRight: "16px",
  },
}));

const SelectGrupoNomesPopularesStyles: ISxStyleObject = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    padding: `${"16px"} 0`,
    width: "100%",
  },
  containerSelecao: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    justifyContent: "flex-start",
    minWidth: "70%",
    alignSelf: "start",
  },
  containerCard: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-btween",
    gap: `16px`,
    marginTop: "10px",
  },
};

export { SelectGrupoNomesPopularesStyles, CardNoNomesPopulares };
