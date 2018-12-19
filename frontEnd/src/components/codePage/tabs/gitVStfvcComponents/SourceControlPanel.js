import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TeamProjectCard from './TeamProjectCard';


export default class SourceControlPanel extends Component {
  
  render() {
    return (
      <div>
        <Paper elevation={1}>
            <br/>
              <Grid container spacing={12} style={{padding:10}}>
                <Grid item sm={2}>
                  <img src={this.props.sourceControlLogo} height="100px" width="100px" alt="git Logo"/>
                </Grid>
                <Grid item sm={10}>
                  <Typography variant='h3'>{this.props.sourceControlType}</Typography>
                </Grid>
              </Grid>
                <Typography variant='h5' color="textSecondary">
                  Number of active Repos: {this.props.sumOfRepos}
                </Typography>
                <br/>
              </Paper>
              {this.props.teamProjectData.map((teamProject,i)=>{
                 return (
                  <div key={i}>
                    <br/>
                    <TeamProjectCard teamProject={{title:teamProject.title}} codeSourcesList={teamProject.codeSourcesList} sourceLogo={this.props.sourceControlLogo}/>
                  </div>
                 );
              })}
             
              
      </div>
    );
  }
}

