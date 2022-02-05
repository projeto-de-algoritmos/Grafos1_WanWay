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
import Map from "../assets/map.svg";
import Logo from "../assets/logo.svg";
import "./App.css";
import { loadCities } from "../utils/loadCities";

function App() {
  const [redeInicial, setRedeInicial] = React.useState(0);
  const [redeFinal, setRedeFinal] = React.useState(0);
  const [rota, setRota] = React.useState(
    "Preencha os dados e encontre uma rota de internet entre as duas cidades!"
  );
  const cities = loadCities();

  const handleRedeInicial = (event, newValue) => {
    setRedeInicial(newValue.id);
  };

  const handleRedeFinal = (event, newValue) => {
    setRedeFinal(newValue.id);
  };

  const handlePesquisa = () => {
    const rotaEncontrada = findRouteBFS(redeInicial, redeFinal)
    let resultado = ""

    resultado += `${rotaEncontrada[0]} `
    for (let aux = 1; aux < rotaEncontrada.length; aux++)
      resultado += `► ${rotaEncontrada[aux]}`

    setRota(resultado);
  };

  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={2}>
          <Card
            variant="outlined"
            sx={{
              height: "fill-available",
              alignItems: "center",
              backgroundColor: "#FFFDF7",
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
        <Grid item xs={10}>
          <Grid
            container
            direction="column"
            sx={{ height: "100%", justifyContent: "center" }}
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
                backgroundColor: "#E5E5E5",
              }}
            >
              <img src={Map} alt="Map" height={"95%"} />
            </Grid>
            <Grid item xs={3}>
              <Card
                variant="outlined"
                sx={{
                  height: "fill-available",
                  backgroundColor: "#FFFDF7",
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
                  {rota}
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
