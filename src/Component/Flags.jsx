import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import Styles from "./Flags.module.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const Flags = () => {
  const [flags, setFlags] = useState([]);

  const fetchFlags = () => {
    axios
      .get("https://xcountries-backend.azurewebsites.net/all")
      .then((response) => {
        console.log(response.data);
        setFlags(response.data);
      })
      .catch((err) => {
        console.error("Error fetching data: " + err);
      });
  };

  useEffect(() => {
    fetchFlags();
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <h1>FLAGS</h1>
      <Grid container spacing={4}>
        {
          // Here you can render the data fetched from the API
          flags.map((flag, index) => {
            return (
              <Grid key={index} item xs={2}>
                <Item>
                  <div className={Styles.box}>
                    <img src={flag.flag} alt={flag.abbr} />
                    <h4>{flag.name}</h4>
                  </div>
                </Item>
              </Grid>
            );
          })
        }
      </Grid>
    </Box>
  );
};

export default Flags;
