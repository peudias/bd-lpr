import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Container,
  CardMedia,
  Card,
  CardContent,
} from "@mui/material";
import banner from "../../assets/imgs/banner.jpeg";

const Home = () => {
  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Box sx={{ backgroundColor: "white", padding: 2 }}>
        <Container>
          <Grid container alignItems="center" justifyContent="space-between">
            <Typography variant="h5">
              Olá, <span style={{ color: "#46818B" }}>Usuário</span>!
            </Typography>
          </Grid>
        </Container>
      </Box>

      <Container sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardMedia
                component="img"
                alt="Banner"
                height="140"
                image={banner}
              />
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Container sx={{ mt: 4 }}>
        <Typography variant="h6">Minha Saúde</Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {["Doenças", "Patógenos", "Sintomas"].map((text, index) => (
            <Grid item xs={6} sm={3} md={2} key={index}>
              <Button variant="outlined" fullWidth>
                <Typography variant="body2">{text}</Typography>
              </Button>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container sx={{ mt: 4 }}>
        <Typography variant="h6">Mini apps</Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {[
            "Consultar todas as Doenças",
            "Consultar Sintomas de uma Doença específica",
            "Consultar todas as Doenças e seus respectivos Sintomas",
            "Consultar o número de Doenças para cada tipo de Patógeno",
            "Consultar estatísticas armazenadas no sistema",
            "Consultar estatísticas sobre os Sintomas",
            "Consultar lista de Doenças com determinado conjunto de Sintomas",
            "Consultar as Doenças mais prováveis",
          ].map((app, index) => (
            <Grid item xs={6} sm={3} md={2} key={index}>
              <Button variant="outlined" fullWidth sx={{ height: "100%" }}>
                <Typography variant="body2" align="center">
                  {app}
                </Typography>
              </Button>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h6">Conteúdo</Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {[
            {
              title: "Saúde de A-Z",
              news: "Novo guia de saúde lançado para 2024.",
            },
            {
              title: "Caderneta da Criança",
              news: "Atualização importante na caderneta de vacinação.",
            },
            {
              title: "Caderneta da Criança",
              news: "Confira as novas orientações para cuidados infantis.",
            },
          ].map((content, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "bold",
                      color: "#46818B",
                    }}
                  >
                    {content.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 1,
                      color: "#555",
                    }}
                  >
                    {content.news}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
