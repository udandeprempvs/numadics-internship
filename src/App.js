import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Link from "@material-ui/core/Link";
import "./App.css";

const countriesURL = "https://restcountries.eu/rest/v2/all";

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  list: {
    width: 300,
  },
});

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const [drawer, setDrawer] = useState(false);
  const [country, setCountry] = useState({});
  //The below useStates were initialised since .map() function in the list was giving error for objects which have an array//
  const [border, setBorder] = useState([]);
  const [language, setLanguage] = useState([]);
  const [timezone, setTimezone] = useState([]);
  const [latlan, setLatlan] = useState([]);
  const [currency, setCurrency] = useState([]);

  const classes = useStyles();

  const toggleDrawer = (drawer, country) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawer(drawer);
    setCountry(country);
    setBorder(country.borders);
    setLanguage(country.languages);
    setTimezone(country.timezones);
    setLatlan(country.latlng);
    setCurrency(country.currencies);
  };

  const list = (country) => (
    <div
      role="presentation"
      onClick={toggleDrawer(false, country)}
      onKeyDown={toggleDrawer(false, country)}
    >
      <List className={classes.list}>
        <ListItem>
          <h2>{country.name}</h2>
        </ListItem>
        <Divider />
        <ListItem>Capital : {country.capital}</ListItem>
        <Divider />
        <ListItem>Region : {country.region}</ListItem>
        <Divider />
        <ListItem>Subregion : {country.subregion}</ListItem>
        <Divider />
        <ListItem>Population : {country.population}</ListItem>
        <Divider />
        <ListItem>Area : {country.area} sq kms</ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Latitude and Longitude" />
        </ListItem>
        {latlan.map((val, index) => (
          <ListItem key={index}>
            <ListItemText secondary={val} />
          </ListItem>
        ))}
        <Divider />
        <ListItem>
          <ListItemText primary="Timezones" />
        </ListItem>
        {timezone.map((val, index) => (
          <ListItem key={index}>
            <ListItemText secondary={val} />
          </ListItem>
        ))}
        <Divider />
        <ListItem>
          <ListItemText primary="Borders" />
        </ListItem>
        {border.map((val, index) => (
          <ListItem key={index}>
            <ListItemText secondary={val} />
          </ListItem>
        ))}
        <Divider />
        <ListItem>
          <ListItemText primary="Languages" />
        </ListItem>
        {language.map((val, index) => (
          <ListItem key={index}>
            <ListItemText secondary={val.name} />
          </ListItem>
        ))}
        <Divider />
        <ListItem>
          <ListItemText primary="Currencies" />
        </ListItem>
        {currency.map((val, index) => (
          <ListItem key={index}>
            <ListItemText secondary={val.name} />
          </ListItem>
        ))}
        <Divider />
      </List>
    </div>
  );

  const getCountriesWithAxios = async () => {
    const response = await axios.get(countriesURL);
    setCountriesData(response.data);
    setCountriesData(response.data);
  };

  useEffect(() => {
    getCountriesWithAxios();
  }, []);

  return (
    <>
      <Drawer
        anchor={"right"}
        open={drawer}
        onClose={toggleDrawer(false, country)}
      >
        {list(country)}
      </Drawer>
      <Grid container>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>
                    <strong>Name</strong>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <strong>Flag</strong>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <strong>Capital</strong>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <strong>Population</strong>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <strong>Region</strong>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {countriesData.map((country) => (
                  <StyledTableRow>
                    <StyledTableCell>
                      <Link onClick={toggleDrawer(true, country)}>
                        {country.name}
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <img src={country.flag} alt="country flag" width="32px" />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {country.capital}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {country.population}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {country.region}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
