import React, { Component } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import GitVSTfvcTab from "./tabs/GitVSTfvcTab";
import BuildStatsTab from "./tabs/BuildStatsTab";
import PolicyStatsTab from "./tabs/PolicyStatsTab";
import GitIcon from "../../svgCustomIcons/git.svg";
import BuildIcon from "../../imgs/icons/buildIcon.svg";
import GitBranchIcon from "../../svgCustomIcons/git-branch.svg";

class CodeDashboard extends Component {
  constructor() {
    super();
    this.state = {
      activeTabValue: 2
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
            label="Policies"
            icon={<img src={GitBranchIcon} alt="Git branch logo" />}
            value={2}
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
          <PolicyStatsTab
            buildData={this.props.buildData}
            repoData={this.props.codeData.gitRepos}
            policyData={this.props.policyData}
          />
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
