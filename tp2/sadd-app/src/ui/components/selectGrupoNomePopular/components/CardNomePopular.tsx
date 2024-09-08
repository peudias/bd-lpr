import React from "react";
import { Box, Card, IconButton, Typography, Tooltip } from "@mui/material";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { cardNomePopularStyles } from "./CardNomePopularStyle";
import { INomesPopulares } from "../../../../libs/typings";

interface ICardNomePopular {
  onRemove?: (nome: string) => void;
  doc: INomesPopulares;
  readOnly: boolean;
}

export const CardNomePopular = ({
  onRemove,
  doc,
  readOnly,
}: ICardNomePopular) => {
  return (
    <Card sx={cardNomePopularStyles.area}>
      <Box sx={cardNomePopularStyles.areaHeader}>
        <Box sx={cardNomePopularStyles.iconAndTitle}>
          <PostAddOutlinedIcon
            fontSize="medium"
            sx={{ width: "inherit", borderRadius: "inherit", color: "chip" }}
          />
          <Box sx={cardNomePopularStyles.areaProduto}>
            <Tooltip title={doc?.nome} arrow>
              <Typography
                variant="body2"
                sx={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {doc?.nome}
              </Typography>
            </Tooltip>
          </Box>
        </Box>
        {!readOnly && (
          <IconButton onClick={() => onRemove && onRemove(doc.nome)}>
            <DeleteOutlineIcon sx={{ color: "chip" }} />
          </IconButton>
        )}
      </Box>
    </Card>
  );
};
