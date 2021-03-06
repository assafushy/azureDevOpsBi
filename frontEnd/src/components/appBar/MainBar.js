import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import TopLevelFilterSet from './TopLevelFilterSet';

export default class MainBar extends Component {
  render() {
    return (
      <div>
         <AppBar position="static">
          <Toolbar>
            <Grid container spacing={8}>
              <Grid item sm={3}>
                <IconButton onClick={this.props.toggleMenu} color="inherit" aria-label="Menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit">
                {this.props.pageName}
                </Typography>
              </Grid>
              <Grid item sm={5}>
                <TopLevelFilterSet globalData={this.props.globalData}/>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}
