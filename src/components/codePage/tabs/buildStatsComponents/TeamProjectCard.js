import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import GitLogo from '../../../../imgs/GitLogo.png';
import BuldByRepoTable from './BuildByRepoTable';

const styles = {
  card: {
    maxWidth: 150
  },
  title: {
    fontSize: 25,
    strong: true
  },
};

class TeamProjectCard extends Component { 
  
  render() {
    const { classes } = this.props;
    
    return (
      <div>
        <Card styles={styles.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {this.props.data.name}
            </Typography>
            <Grid container spacing={12}>
        
              <Grid item sm={12}>
                <BuldByRepoTable data={this.props.data.repoList}/>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}
export default withStyles(styles)(TeamProjectCard);