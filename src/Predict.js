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

const teams = {
  tor: {
    name: "Toronto Raptors",
    abbreviation: "TOR",
    logo: "http://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/tor.png",
  },
  gsw: { name: "Golden State Warrios", abbreviation: "GSW" },
  lac: { name: "Los Angeles Clippers", abbreviation: "LAC" },
  lal: { name: "Los Angeles Lakers", abbreviation: "LAL" },
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
      }),
    };

    return fetch(url, requestOptions).then((response) => response.json());
  } else {
    return Promise.resolve();
  }
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
                }}
              >
                Home
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
                }}
              >
                Visitor
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
            <Paper className={classes.paper}>{predictions.message} </Paper>
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
