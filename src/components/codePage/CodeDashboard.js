import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import GitIcon from '../../svgCustomIcons/git.svg'
import GitBranchIcon from '../../svgCustomIcons/git-branch.svg';
import GitVSTfvcTab from './tabs/GitVSTfvcTab';

export default class CodeDashboard extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }

  constructor(){
    super();
    this.state = {
      activeTabValua : 0
    }
  }//constructor
  
  render() {
    return (
      <div>
        <Tabs
            value={this.state.activeTabValua}
            onChange={(event,value)=>{this.setState({activeTabValua:value})}}
            scrollable
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
        >
            <Tab label="Git vs TFVC" icon={<img src={GitIcon} alt="Git logo" />} value={0} />
            <Tab label="Git Status" icon={<img src={GitBranchIcon} alt="Git branch logo" />} value={1} />
        </Tabs>   

        {this.state.activeTabValua === 0 && <GitVSTfvcTab  sumOfRepos={500}/>}
        {this.state.activeTabValua === 1 && <h1 align={'center'}>Under Construction</h1>}

      </div>
    )
  }//render
}//class
