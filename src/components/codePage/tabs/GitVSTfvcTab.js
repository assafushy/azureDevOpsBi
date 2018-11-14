import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GitLogo from '../../../imgs/GitLogo.png';
import TfvcLogo from '../../../imgs/TfvcLogo.png';  
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

export default class GitVSTfvcTab extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }

  render() {
    return (
      <div>
        <br/>
        <Grid container spacing={12}>
          <Grid item sm={6}>
            <Paper elevation={1} style={{height:'100%'}}>
              <Grid container spacing={12}>
                <Grid item sm={2}>
                  <img src={GitLogo} height="100px" width="100px" alt="git Logo"/>
                </Grid>
                <Grid item sm={10}>
                  <Typography><h1>git</h1></Typography>
                </Grid>
              </Grid>
                <Typography>
                  <h2>Number of active git Repos:</h2>
                </Typography>
            </Paper>
          </Grid>
  
          <Grid item sm={6}>
            <Paper elevation={1}>
              <Grid container spacing={12}>
                <Grid item sm={2}>
                  <img src={TfvcLogo} height="100px" width="100px" alt="Tfvc Logo"/>
                </Grid>
                <Grid item sm={10}>
                  <h1>TFVC</h1>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}
