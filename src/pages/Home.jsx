import React, { Component } from 'react'

import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';

export class Home extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography className={classes.message} noWrap variant="display1">{'Select data type'}</Typography>
      </div>
    )
  }
}

const styles = theme => ({
  message: {
    padding: theme.spacing.unit * 2
  }
});

export default withStyles(styles)(Home);