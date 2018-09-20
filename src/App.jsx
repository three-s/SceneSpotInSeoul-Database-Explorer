import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";

import DataInfoIcon from "@material-ui/icons/Description";
import LocationsIcon from "@material-ui/icons/LocationOn";
import MediaIcon from "@material-ui/icons/Movie";
import ScenesIcon from "@material-ui/icons/Photo";

import HomePage from "./pages/Home";
import DataInfoPage from "./pages/DataInfo";
import LocationsPage from "./pages/Locations";
import MediaPage from "./pages/Media";
import ScenesPage from "./pages/Scenes";

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div className={classes.app}>
          <AppBar
            position="absolute"
            color="default"
            className={classes.appBar}
          >
            <Toolbar>
              <Typography variant="title" color="inherit">
                SceneSpotInSeoul Database Explorer
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.toolbar} />
            <List component="nav">
              <Tooltip title="DataInfo" placement="right">
                <ListItem button component={Link} to="/data-info">
                  <ListItemIcon>
                    <DataInfoIcon />
                  </ListItemIcon>
                  <ListItemText primary="DataInfo" />
                </ListItem>
              </Tooltip>
              <Tooltip title="Locations" placement="right">
                <ListItem button component={Link} to="/locations">
                  <ListItemIcon>
                    <LocationsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Locations" />
                </ListItem>
              </Tooltip>
              <Tooltip title="Media" placement="right">
                <ListItem button component={Link} to="/media">
                  <ListItemIcon>
                    <MediaIcon />
                  </ListItemIcon>
                  <ListItemText primary="Scenes" />
                </ListItem>
              </Tooltip>
              <Tooltip title="Scenes" placement="right">
                <ListItem button component={Link} to="/scenes">
                  <ListItemIcon>
                    <ScenesIcon />
                  </ListItemIcon>
                  <ListItemText primary="Scenes" />
                </ListItem>
              </Tooltip>
            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Route exact path="/" component={HomePage} />
            <Route path="/data-info" component={DataInfoPage} />
            <Route path="/locations" component={LocationsPage} />
            <Route path="/media" component={MediaPage} />
            <Route path="/scenes" component={ScenesPage} />
          </main>
        </div>
      </Router>
    );
  }
}

const styles = theme => ({
  app: {
    flexGrow: 1,
    height: "100vh",
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawerPaper: {
    position: "relative",
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit,
    minWidth: 0,
    width: "100%",
    overflowX: "auto"
  },
  toolbar: theme.mixins.toolbar
});

export default withStyles(styles)(App);
