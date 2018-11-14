import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import SourceControlPanel from './SourceControlPanel';
import LineChart from '../../common/TrendLineChart';

import TfvcLogo from '../../../imgs/TfvcLogo.png';  
import GitLogo from '../../../imgs/GitLogo.png';



const sampleTeamProjectData =[
  {title:'Team Title',codeSourcesList:[{title:'repoTitle',sourceLogo:GitLogo}]},
  {title:'Team Title',codeSourcesList:[{title:'repoTitle',sourceLogo:GitLogo}]},
  {title:'Team Title',codeSourcesList:[{title:'repoTitle',sourceLogo:GitLogo}]},
  {title:'Team Title',codeSourcesList:[{title:'repoTitle',sourceLogo:GitLogo}]},
  {title:'Team Title',codeSourcesList:[{title:'repoTitle',sourceLogo:GitLogo}]},
  {title:'Team Title',codeSourcesList:[{title:'repoTitle',sourceLogo:GitLogo}]},
  {title:'Team Title',codeSourcesList:[{title:'repoTitle',sourceLogo:GitLogo}]}
]

export default class GitVSTfvcTab extends Component {
  
  render() {
    return (
      <div>
        <br/>
        <Grid container spacing={12} > 
          <Grid item sm={12}>
              <LineChart/> 
          </Grid>    
          <Grid item sm={6}>
            <SourceControlPanel teamProjectData={sampleTeamProjectData} sourceControlType='git' sumOfRepos={500} sourceControlLogo={GitLogo}/>
          </Grid>
          <Grid item sm={6}>
            <SourceControlPanel teamProjectData={sampleTeamProjectData} sourceControlType='TFVC' sumOfRepos={350} sourceControlLogo={TfvcLogo}/>  
          </Grid>
        </Grid>
      </div>
    )
  }
}
