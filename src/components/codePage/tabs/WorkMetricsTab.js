import React, { Component } from "react";
import TeamMetricsExpansionPanel from "./workMetricsComponents/TeamMetricsExpansionPanel";
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
            <TeamMetricsExpansionPanel
              teamProject={{ title: "Summary" }}
              defaultExpanded
            />
            {this.props.globalData.teamProjectsData.value.map(
              (teamProject, i) => {
                return (
                  <div key={i}>
                    <br />
                    <TeamMetricsExpansionPanel
                      teamProject={{ title: "Team: " + teamProject.name }}
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
