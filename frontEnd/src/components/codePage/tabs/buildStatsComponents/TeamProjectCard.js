import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import Config from "../../../../configFiles/config";
import BuldByRepoTable from "./BuildByRepoTable";
import BuildPieChart from "./BuildPieChart";

const styles = {
  card: {
    maxWidth: 150
  },
  title: {
    fontSize: 25,
    strong: true
  }
};

class TeamProjectCard extends Component {
  calculateBuildGraphData(totalNum, BuildNum, ciNum) {
    let noBuild = totalNum - BuildNum;
    let noCi = BuildNum - ciNum;

    return [noBuild, noCi, ciNum];
  } //calculateBuildGraphData

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card styles={styles.card}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {this.props.data.name}
            </Typography>
            <Grid container spacing={12}>
              <Grid item sm={6} />
              <Grid item sm={6}>
                <BuildPieChart
                  chartData={this.calculateBuildGraphData(
                    this.props.data.repoCount,
                    this.props.data.count,
                    this.props.data.CICount
                  )}
                />
              </Grid>
              <Grid item sm={12}>
                <BuldByRepoTable data={this.props.data.repoList} />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => {
                window.open(
                  `${Config.BASE_URL}/${this.props.data.name}/_build`
                );
                console.log(this.props.data);
              }}
            >
              Learn More
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}
export default withStyles(styles)(TeamProjectCard);
