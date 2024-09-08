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
import { useNavigate } from "react-router-dom";
import CoronavirusOutlinedIcon from "@mui/icons-material/CoronavirusOutlined";
import fakeNewsImage from "../../assets/imgs/fakeNews.png";
import atualizacaoCaderneta from "../../assets/imgs/caderneta.jpeg";
import orientacoesCaderneta from "../../assets/imgs/caderneta2.jpg";
import HealingOutlinedIcon from "@mui/icons-material/HealingOutlined";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";

const Home = () => {
  const navigate = useNavigate();

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
          {[
            {
              text: "Doenças",
              path: "/doenca/view",
              icon: <CoronavirusOutlinedIcon />,
            },
            {
              text: "Patógenos",
              path: "/patogeno/view",
              icon: <VaccinesOutlinedIcon />,
            },
            /*{
              text: "Sintomas",
              path: "/sintoma/view",
              icon: <HealingOutlinedIcon />,
            },*/
          ].map((item, index) => (
            <Grid item xs={6} sm={3} md={2} key={index}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={item.icon}
                onClick={() => navigate(item.path)}
              >
                <Typography variant="body2">{item.text}</Typography>
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
              image: fakeNewsImage,
            },
            {
              title: "Caderneta da Criança",
              news: "Atualização importante na caderneta de vacinação.",
              image: atualizacaoCaderneta,
            },
            {
              title: "Caderneta da Criança",
              news: "Confira as novas orientações para cuidados infantis.",
              image: orientacoesCaderneta,
            },
          ].map((content, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ flexGrow: 1 }}>
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
                  </Box>
                  <CardMedia
                    component="img"
                    image={content.image}
                    alt={content.title}
                    sx={{ width: 80, height: 80, borderRadius: "4px" }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box sx={{ height: 25 }} />
    </Box>
  );
};

export default Home;
