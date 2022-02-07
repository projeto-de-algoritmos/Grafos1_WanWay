import * as React from "react";
import { findRouteBFS } from "../utils/findRoute";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Map from "../components/Map"
import Logo from "../assets/logo.svg";
import "./App.css";
import { loadCities } from "../utils/loadCities";
import {COLORS} from "../assets/colors";

function App() {
  const [initialNetwork, setInitialNetwork] = React.useState(0);
  const [finalNetwork, setFinalNetwork] = React.useState(0);
  const [route, setRoute] = React.useState(
    "Preencha os dados e encontre uma rota de internet entre as duas cidades!"
  );
  const cities = loadCities();

  const handleRedeInicial = (e, newValue) => {
    setInitialNetwork(newValue.id);
    console.log(e);
  };

  const handleRedeFinal = (e, newValue) => {
    setFinalNetwork(newValue.id);
    console.log(e);
  };

  const handlePesquisa = () => {
    const spottedRoute = findRouteBFS(initialNetwork, finalNetwork)
    let result = ""

    result += `${spottedRoute[0]} `
    for (let aux = 1; aux < spottedRoute.length; aux++){
      result += `► ${spottedRoute[aux]}`;
    }
    
    setRoute(result);
    changeRouteColor(spottedRoute);
  };

  function changeRouteColor(newRoute) {
    // console.log(newRoute)
    document.querySelectorAll(`circle[class="WAN"]`).forEach(el => el.style.fill = COLORS.lightblue)
    document.querySelectorAll(`circle[class="LAN"]`).forEach(el => el.style.fill = COLORS.bluegreen)
    document.querySelector(`circle[id="${newRoute[0]}"]`).style.fill = COLORS.orange;
    document.querySelector(`circle[id="${newRoute[newRoute.length - 1]}"]`).style.fill = COLORS.orange;
    for(let aux = 1; aux < newRoute.length - 1; aux++)
      document.querySelector(`circle[id="${newRoute[aux]}"]`).style.fill = COLORS.orangelight;
  }

  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={2.5}>
          <Card
            variant="outlined"
            sx={{
              height: "fill-available",
              alignItems: "center",
              backgroundColor: COLORS.beige,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                height: "30%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {" "}
              <img src={Logo} alt="Logo" height="80%" />
            </Box>
            <Typography
              sx={{ fontSize: 16 }}
              color="text.secondary"
              variant="h4"
              textAlign={"center"}
              marginTop="5%"
            >
              Selecione a rede inicial e a rede destino para encontrar o menor
              caminho.
            </Typography>
            <Autocomplete
              disablePortal
              options={cities}
              getOptionLabel={(cities) => cities.name}
              sx={{ marginTop: "10%", width: "80%" }}
              renderInput={(params) => (
                <TextField {...params} label="Rede Inicial" />
              )}
              onChange={handleRedeInicial}
            />
            <Autocomplete
              disablePortal
              options={cities}
              getOptionLabel={(cities) => cities.name}
              sx={{ marginTop: "10%", width: "80%" }}
              renderInput={(params) => (
                <TextField {...params} label="Rede Destino" />
              )}
              onChange={handleRedeFinal}
            />
            <Button
              variant="contained"
              endIcon={<SearchIcon />}
              sx={{ marginTop: "10%", width: "80%" }}
              onClick={handlePesquisa}
            >
              Encontrar
            </Button>
          </Card>
        </Grid>
        <Grid item xs={9.5}>
          <Box sx={{ height: "100%"}}>
          <Grid
            container
            direction="column"
            sx={{ height: "100%"}}
          >
            <Grid
              item
              xs={9}
              alignSelf={"center"}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: COLORS.lightgrey,
              }}
            >
              <Map />
            </Grid>
            <Grid item xs={2}>
              <Card
                variant="outlined"
                sx={{
                  height: "fill-available",
                  backgroundColor: COLORS.beige,
                }}
              >
                <Typography
                  variant="h4"
                  color="text.secondary"
                  component="div"
                  sx={{
                    fontSize: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Menor Rota
                </Typography>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontSize: 18,
                    height: "fill-available",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {route}
                </Typography>
              </Card>
            </Grid>
          </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
