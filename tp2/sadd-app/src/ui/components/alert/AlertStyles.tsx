import { ISxStyleObject } from "../../../libs/typings";

export const AlertStyles: ISxStyleObject = {
  content: {
    margin: "90px",
    position: "absolute",
    top: "10px",
    right: {
      xs: "-60px",
      sm: "-60px",
      md: "10px",
      lg: "10px",
      xl: "10px",
    },
    width: {
      xs: "250px",
      sm: "300px",
      md: "500px",
      lg: "500px",
      xl: "500px",
    },
  },
  alertProgressContainer: {
    position: "relative",
    border: "1px solid transparent",
    borderRadius: "4px",
    overflow: "hidden",
  },
  progressBar: {
    position: "absolute",
    top: "0",
    left: "0",
    height: "6px",
    backgroundColor: "rgba(70, 129, 139, 1)",
    transition: "width 0.05s linear",
  },
};
