import React from "react";
import {
  HeaderPage,
  Page,
  TitlePage,
  SearchContainer,
} from "./PageLayoutStyles";
import { Box, IconButton, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface IPageLayout {
  children?: React.ReactNode;
  searchs?: React.ReactNode;
  actions?: React.ReactNode;
  onBack?: () => void;
  titleComponent?: React.ReactNode;
}

export const PageLayout: React.FC<IPageLayout> = ({
  children,
  actions,
  searchs,
  onBack,
  titleComponent,
}) => {
  return (
    <Page>
      <HeaderPage>
        <TitlePage>
          {onBack && (
            <Tooltip title="Voltar">
              <IconButton
                onClick={onBack}
                sx={{ marginLeft: -1, width: 20, height: 20 }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
          )}
          {titleComponent}
        </TitlePage>
        {(actions || searchs) && (
          <SearchContainer>
            {searchs ?? <Box sx={{ flexGrow: 1 }}></Box>}
            {actions}
          </SearchContainer>
        )}
      </HeaderPage>
      {children}
    </Page>
  );
};
