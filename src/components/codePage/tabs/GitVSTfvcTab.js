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
  
  teamProjectDataFactory(teamProjectArray={value:[]},repoArray=[]){
    let mergedData=[];

    teamProjectArray.value.forEach(teamProject => {
     let project = {title:teamProject.name,codeSourcesList:[]};

      repoArray.forEach(teamRepos=>{
        teamRepos.value.forEach(repo=>{
        if(repo.project.id === teamProject.id){
          project.codeSourcesList.push({title:repo.name,id:repo.id,sourceLogo:GitLogo})
        }
        })//foreach
      })//foreach
     
      if(project.codeSourcesList.length > 0){mergedData.push(project);}
    })//foreach
    return mergedData;
  }//teamProjectDataFactory

  render() {
    return (
      <div>
        <br/>
        <Grid container spacing={12} > 
          <Grid item sm={12}>
              <LineChart/> 
          </Grid>    
          <Grid item sm={6}>
            <SourceControlPanel teamProjectData={this.teamProjectDataFactory(this.props.globalData.teamProjectsData,this.props.codeData.gitRepos)}
                                sourceControlType='git'
                                sumOfRepos={this.props.sumOfRepos}
                                sourceControlLogo={GitLogo}/>
          </Grid>
          <Grid item sm={6}>
            <SourceControlPanel teamProjectData={sampleTeamProjectData} sourceControlType='TFVC' sumOfRepos={350} sourceControlLogo={TfvcLogo}/>  
          </Grid>
        </Grid>
      </div>
    )
  }
}
