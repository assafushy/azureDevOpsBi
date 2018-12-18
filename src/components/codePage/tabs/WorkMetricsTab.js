import React, { Component } from "react";
import RepoMetricsExpansionPanel from "./workMetricsComponents/RepoMetricsExpansionPanel";
import Grid from "@material-ui/core/Grid";

export default class WorkMetricsTab extends Component {
  state = {
    expanded: null
  };
  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };
  render() {
    const { expanded } = this.state;
    return (
      <div>
        <Grid container spacing={12}>
          <Grid item xs={12} sm={10}>
            <RepoMetricsExpansionPanel
              teamProject={{ title: "AllSoftware" }}
              defaultExpanded
            />
            {this.props.globalData.teamProjectsData.value.map(
              (teamProject, i) => {
                return (
                  <div key={i}>
                    <br />
                    <RepoMetricsExpansionPanel
                      teamProject={{ title: teamProject.name }}
                      onChange={{ onChange: this.handleChange(i) }}
                    />
                  </div>
                );
              }
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}
