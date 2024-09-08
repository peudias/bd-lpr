import { ISxStyleObject } from "../../../../libs/typings";

export const cardNomePopularStyles: ISxStyleObject = {
  area: {
    width: {
      xs: "100%",
      sm: "700px",
      md: "700px",
      lg: "450px",
      xl: "450px",
    },
    maxHeight: "110px",
    padding: "1rem",
    display: "flex",
    alignItems: "start",
    flexDirection: "column",
    justifyContent: "start",
    gap: "8px",
  },
  areaHeader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "15px",
  },
  iconAndTitle: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  body: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: ".8rem",
    height: "100%",
    width: "100%",
  },
  areaProduto: {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    flex: 1,
    maxWidth: {
      xs: "100px",
      sm: "400px",
      md: "500px",
      lg: "300px",
      xl: "300px",
    },
  },
};
