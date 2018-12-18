import React, { Component } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default class RepoMetricsExpansionPanel extends Component {
  render() {
    return (
      <div>
        <ExpansionPanel expanded={this.props.expand}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{this.props.teamProject.title}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails />
        </ExpansionPanel>
      </div>
    );
  }
}
