import React, { Component } from "react";
import RepoMetricsExpansionPanel from "./workMetricsComponents/RepoMetricsExpansionPanel";
import Grid from "@material-ui/core/Grid";

export default class WorkMetricsTab extends Component {
  render() {
    return (
      <div>
        {this.props.globalData.teamProjectsData.value.map((teamProject, i) => {
          return (
            <div key={i}>
              <br />
              <RepoMetricsExpansionPanel
                teamProject={{ title: teamProject.name }}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
