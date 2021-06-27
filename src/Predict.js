import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Select,
  MenuItem,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  paper: {
    height: 100,
    width: "100%",
  },
  media: {
    paddingTop: "50%", // 16:9
  },
}));

const baseUrl = "https://8s7jh2l7xl.execute-api.us-east-1.amazonaws.com/dev";
const logo =
  "http://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/ID.png";

const teams = {
  atl: { name: "Atlanta Hawks", abbreviation: "ATL" },
  bkn: { name: "Brooklyn Nets", abbreviation: "BKN" },
  bos: { name: "Boston Celtics", abbreviation: "BOS" },
  cha: { name: "Charlotte Hornets", abbreviation: "CHA" },
  chi: { name: "Chicago Bulls", abbreviation: "CHI" },
  cle: { name: "Cleveland Cavaliers", abbreviation: "CLE" },
  dal: { name: "Dallas Mavericks", abbreviation: "DAL" },
  den: { name: "Denver Nuggets", abbreviation: "DEN" },
  det: { name: "Detroit Pistons", abbreviation: "DET" },
  gsw: { name: "Golden State Warriors", abbreviation: "GSW" },
  hou: { name: "Houston Rockets", abbreviation: "HOU" },
  ind: { name: "Indiana Pacers", abbreviation: "IND" },
  lac: { name: "Los Angeles Clippers", abbreviation: "LAC" },
  lal: { name: "Los Angeles Lakers", abbreviation: "LAL" },
  mem: { name: "Memphis Grizzlies", abbreviation: "MEM" },
  mia: { name: "Miami Heat", abbreviation: "MIA" },
  mil: { name: "Milwaukee Bucks", abbreviation: "MIL" },
  min: { name: "Minnesota Timberwolves", abbreviation: "MIN" },
  nop: { name: "New Orleans Pelicans", abbreviation: "NOP" },
  nyk: { name: "New York Knicks", abbreviation: "NYK" },
  okc: { name: "Oklahoma City Thunder", abbreviation: "OKC" },
  orl: { name: "Orlando Magic", abbreviation: "ORL" },
  phi: { name: "Philadelphia 76ers", abbreviation: "PHI" },
  phx: { name: "Phoenix Suns", abbreviation: "PHX" },
  por: { name: "Portland Trail Blazers", abbreviation: "POR" },
  sac: { name: "Sacramento Kings", abbreviation: "SAC" },
  sas: { name: "San Antonio Spurs", abbreviation: "SAS" },
  tor: { name: "Toronto Raptors", abbreviation: "TOR" },
  uta: { name: "Utah Jazz", abbreviation: "UTA" },
  was: { name: "Washington Wizards", abbreviation: "WAS" },
};

function getPredictions(home, visitor) {
  console.log(home, visitor);
  if (home && visitor && home !== visitor) {
    const url = new URL(baseUrl + "/predict");
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        home: home.toUpperCase(),
        visitor: visitor.toUpperCase(),
        client: "react-client",
      }),
    };

    return fetch(url, requestOptions).then((response) => response.json());
  } else {
    return Promise.resolve();
  }
}

function translateMessage(msg) {
  return msg.split(":")[1] > 0
    ? "Home team will will"
    : "Visitor team will win";
}

export function Predict() {
  const classes = useStyles();
  const [homeInput, setHomeInput] = useState("");
  const [visitorInput, setVisitorInput] = useState("");
  const [predictions, setPredictions] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setLoading(true);

    getPredictions(homeInput, visitorInput).then((response) => {
      console.log(response);

      setPredictions(response);
      setLoading(false);
    });
  }, [homeInput, visitorInput]);

  return (
    <div>
      <Grid container spacing={3} justify="center">
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Grid
              container
              spacing={2}
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid
                item
                style={{
                  width: "97%",
                  background: "DodgerBlue",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                HOME
              </Grid>
              <Grid item>
                <Select
                  label="Home Team"
                  value={homeInput}
                  onChange={(e) => setHomeInput(e.target.value)}
                  style={{ minWidth: 200 }}
                >
                  {Object.values(teams).map((value, index) => {
                    return (
                      <MenuItem key={index} value={value.abbreviation}>
                        <img
                          style={{ height: "30px", width: "30px" }}
                          src={logo.replace(
                            "ID",
                            value.abbreviation.toLocaleLowerCase()
                          )}
                          alt={value.abbreviation}
                        ></img>
                        {value.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Grid
              container
              spacing={2}
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid
                item
                style={{
                  width: "97%",
                  background: "Crimson",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                VISITOR
              </Grid>
              <Grid item>
                <Select
                  label="Visitor Team"
                  value={visitorInput}
                  onChange={(e) => setVisitorInput(e.target.value)}
                  style={{ minWidth: 200 }}
                >
                  {Object.values(teams).map((value, index) => {
                    return (
                      <MenuItem key={index} value={value.abbreviation}>
                        <img
                          style={{ height: "30px", width: "30px" }}
                          src={logo.replace(
                            "ID",
                            value.abbreviation.toLocaleLowerCase()
                          )}
                          alt={value.abbreviation}
                        ></img>
                        {value.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      {predictions ? (
        <Grid container spacing={3} justify="center">
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Grid
                container
                spacing={2}
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item>{predictions.message}</Grid>
                <Grid item>{translateMessage(predictions.message)}</Grid>
                <Grid item>
                  Predictions refers to +/- stats, so positive means home team
                  will win and visitor negative
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        ""
      )}

      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
