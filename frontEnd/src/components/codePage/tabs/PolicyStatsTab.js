import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import _ from "lodash";
import TeamProjectCard from "../../common/TeamProjectCard";
import BuildPieChart from "./buildStatsComponents/BuildPieChart";

export default class PolicyStatsTab extends Component {
  teamProjectDataFactory(
    teamProjectArray = { value: [] },
    repoArray = [],
    type = "git"
  ) {
    let mergedData = [];
    if (teamProjectArray.value !== undefined) {
      teamProjectArray.value.forEach(teamProject => {
        let project = { title: teamProject.name, codeSourcesList: [] };
        if (type === "git") {
          repoArray.forEach(repo => {
            if (repo.project.id === teamProject.id) {
              project.codeSourcesList.push({
                title: repo.name,
                id: repo.id,
                sourceLogo: {}
              });
            }
          }); //foreach
          if (project.codeSourcesList.length > 0) {
            mergedData.push(project);
          }
        } else {
          //TFVC
          repoArray.forEach(teamRepos => {
            if (teamRepos.count > 0) {
              if (_.includes(teamRepos.value[0].url, teamProject.id)) {
                //we have TFVC src
                let repoName = teamRepos.value[0].path.substr(2);
                project.codeSourcesList.push({
                  title: repoName,
                  id: repoName,
                  sourceLogo: {}
                });
              } //if
            } //if
          }); //foreach
          if (project.codeSourcesList.length > 0) {
            mergedData.push(project);
          }
        } //if
      }); //foreach
    } //if
    return mergedData;
  } //teamProjectDataFactory

  calculateBuildGraphData(totalNum, BuildNum, ciNum) {
    let noBuild = totalNum - BuildNum;
    let noCi = BuildNum - ciNum;
    return [noBuild, noCi, ciNum];
  } //calculateBuildGraphData

  render() {
    console.log(this.props.policyData);
    return (
      <div>
        <br />
        <Grid container spacing={12}>
          <Grid item sm={12}>
            {/* <BuildPieChart
              chartData={this.calculateBuildGraphData(
                this.props.repoData.count,
                this.props.buildData.buildDefentionsByGitRepos.count,
                this.props.buildData.buildDefentionsByGitRepos.CICount
              )}
            /> */}
          </Grid>
          <Grid item sm={12}>
            {this.props.policyData.policyByTeamProject ? (
              this.props.policyData.policyByTeamProject.map((teamData, i) => {
                return teamData.repoList.length > 0 ? (
                  <TeamProjectCard
                    key={i}
                    data={teamData}
                    teamCardType={"policy"}
                  />
                ) : null;
              })
            ) : (
              <h1>nothing to show</h1>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}
