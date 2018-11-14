import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


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
  
  constructor(){
    super();
  }  
  
  
  render() {
    const { classes } = this.props;
    
    return (
      <div>
        <Card styles={styles.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {this.props.teamProject.title}
            </Typography>
            <Grid container spacing={12}>
              <Grid item sm={1}/>
              <Grid item sm={11}>
                {this.props.codeSourcesList.map((src)=>{
                  return(
                    <Grid container spacing={12}>
                      <Grid item sm={1}>
                        <img src={this.props.sourceLogo} alt='logo' width='30' height='30'/>
                      </Grid>
                      <Grid item sm={11}>
                        <Typography  color="textSecondary">{src.title}</Typography>
                      </Grid>
                    </Grid>
                  );//return
                })}
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