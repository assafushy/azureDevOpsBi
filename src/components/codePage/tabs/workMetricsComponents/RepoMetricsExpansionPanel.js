import React, { Component } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Card, CardContent } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  card: {
    minWidth: 150,
    minHeight: 100
  },
  title: {
    marginLeft: 5
  }
};

class RepoMetricsExpansionPanel extends Component {
  render() {
    return (
      <div>
        <ExpansionPanel
          defaultExpanded={this.props.defaultExpanded}
          expanded={this.props.expanded}
          onChange={this.props.onChange}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Team: {this.props.teamProject.title}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Card className={this.props.classes.card}>
              <CardContent />
              <Typography className={this.props.classes.title}>
                LeadTime
              </Typography>
            </Card>
            <Card className={this.props.classes.card}>
              <CardContent />
              <Typography className={this.props.classes.title}>
                Velocity
              </Typography>
            </Card>
            <Card className={this.props.classes.card}>
              <CardContent />
              <Typography className={this.props.classes.title}>
                Burn rate
              </Typography>
            </Card>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(RepoMetricsExpansionPanel);
