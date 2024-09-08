import { ISxStyleObject } from "../../../libs/typings";

export const AlertStyles: ISxStyleObject = {
  content: {
    position: "absolute",
    bottom: "10px",
    left: "20px",
    width: {
      xs: "250px",
      sm: "300px",
      md: "700px",
      lg: "700px",
      xl: "700px",
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
