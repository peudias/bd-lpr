import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import logo from "../../../assets/imgs/logo.png";
import { useNavigate } from "react-router-dom";
import logoImage from "../../../assets/imgs/logo.png";
import CoronavirusOutlinedIcon from "@mui/icons-material/CoronavirusOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import HealingOutlinedIcon from "@mui/icons-material/HealingOutlined";

interface Props {
  window?: () => Window;
}

interface IRoutes {
  name: string;
  path: string;
  icon?: JSX.Element;
}

const drawerWidth = 240;
const navItems: IRoutes[] = [
  { name: "Home", path: "/home", icon: <HomeOutlinedIcon /> },
  { name: "Doenças", path: "/doenca/view", icon: <CoronavirusOutlinedIcon /> },
  {
    name: "Patógenos",
    path: "/patogeno/view",
    icon: <VaccinesOutlinedIcon />,
  },
  /*{
    name: "Sintomas",
    path: "/sintoma/view",
    icon: <HealingOutlinedIcon />,
  },
  { name: "Registros", path: "/logging", icon: <AssignmentOutlinedIcon /> },*/
];

export function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#46818B",
          padding: 2,
        }}
      >
        <Avatar
          alt="Logo"
          src={logoImage}
          sx={{
            width: 50,
            height: 50,
            mb: 1,
            cursor: "pointer",
          }}
          onClick={() => navigate("/home")}
        />
        <Typography
          variant="h6"
          sx={{
            color: "#FFFFFF",
            fontFamily: "'SUSE', sans-serif",
          }}
        >
          Meu SADD
        </Typography>
      </Box>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              sx={{ justifyContent: "flex-start", paddingLeft: 2 }}
              onClick={() => {
                navigate(item.path);
              }}
            >
              {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Avatar
              alt="Logo"
              src={logo}
              sx={{ mr: 2, cursor: "pointer" }}
              onClick={() => navigate("/home")}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{
                display: { xs: "none", sm: "block" },
                fontFamily: "'SUSE', sans-serif",
              }}
            >
              Meu SADD - Sistema de Apoio ao Diagnóstico de Doenças
            </Typography>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item, index) => (
              <Button
                key={index}
                sx={{ color: "#fff" }}
                onClick={() => {
                  navigate(item.path);
                }}
                startIcon={item.icon}
              >
                {item.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main">
        <Toolbar />
      </Box>
    </Box>
  );
}
