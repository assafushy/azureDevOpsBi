import React, { Component } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import GitVSTfvcTab from "./tabs/GitVSTfvcTab";
import BuildStatsTab from "./tabs/BuildStatsTab";
import WorkMetricsTab from "./tabs/WorkMetricsTab";
import GitIcon from "../../svgCustomIcons/git.svg";
import BuildIcon from "../../imgs/icons/buildIcon.svg";
import GitBranchIcon from "../../svgCustomIcons/git-branch.svg";
import WorkMetricsIcon from "../../svgCustomIcons/calendar-edit.svg";

class CodeDashboard extends Component {
  constructor() {
    super();
    this.state = {
      activeTabValue: 1
    };
  } //constructor

  render() {
    return (
      <div>
        <Tabs
          value={this.state.activeTabValue}
          onChange={(event, value) => {
            this.setState({ activeTabValue: value });
          }}
          scrollable
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab
            label="Git vs TFVC"
            icon={<img src={GitIcon} alt="Git logo" />}
            value={0}
          />
          <Tab
            label="Build Stats"
            icon={<img src={BuildIcon} alt="Git logo" />}
            value={1}
          />
          <Tab
            label="Git Status"
            icon={<img src={GitBranchIcon} alt="Git branch logo" />}
            value={2}
          />
          <Tab
            label="Work"
            icon={<img src={WorkMetricsIcon} alt="Git branch logo" />}
            value={3}
          />
        </Tabs>

        {this.state.activeTabValue === 0 && (
          <GitVSTfvcTab
            globalData={this.props.globalData}
            codeData={this.props.codeData}
            sumOfGitRepos={this.props.codeData.gitRepos.count}
            sumOfTFVCRepos={this.calculateReposCount(
              this.props.codeData.tfvcRepos
            )}
          />
        )}
        {this.state.activeTabValue === 1 && (
          <BuildStatsTab
            buildData={this.props.buildData}
            repoData={this.props.codeData.gitRepos}
          />
        )}
        {this.state.activeTabValue === 2 && (
          <h1 align={"center"}>Under Construction</h1>
        )}
        {this.state.activeTabValue === 3 && (
          <WorkMetricsTab globalData={this.props.globalData} />
        )}
      </div>
    );
  } //render

  calculateReposCount(repoArray = []) {
    let RepoCount = 0;
    repoArray.forEach(repoList => {
      if (repoList.count) {
        RepoCount += 1;
      } else {
        repoList.forEach(() => {
          RepoCount += 1;
        });
      }
    });

    return RepoCount;
  } //calculateReposCount
} //class

export default CodeDashboard;
