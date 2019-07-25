import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import Config from "../../configFiles/config";
import PolicyByRepoTable from "../codePage/tabs/policyStatsComponents/PolicyByRepoTable";
import BuildByRepoTable from "../codePage/tabs/buildStatsComponents/BuildByRepoTable";
import BuildPieChart from "../codePage/tabs/buildStatsComponents/BuildPieChart";

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

  cardTableFactory(cardType, data) {
    switch (cardType) {
      case "build":
        return <BuildByRepoTable data={data} />;
      case "policy":
        return <PolicyByRepoTable data={data} />;
      default:
        return <p>Nothing to show :(</p>;
    }
  }

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
                {/* <BuildPieChart
                  chartData={this.calculateBuildGraphData(
                    this.props.data.repoCount,
                    this.props.data.count,
                    this.props.data.CICount
                  )}
                /> */}
              </Grid>
              <Grid item sm={12}>
                {this.cardTableFactory(
                  this.props.teamCardType,
                  this.props.data.repoList
                )}
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => {
                switch (this.props.teamCardType) {
                  case "policy":
                    window.open(
                      `${Config.BASE_URL}/${
                        this.props.data.name
                      }/_settings/policies`
                    );
                    break;
                  case "build":
                    window.open(
                      `${Config.BASE_URL}/${this.props.data.name}/_build`
                    );
                    break;
                  default:
                    break;
                }

                // console.log(this.props.data);
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
