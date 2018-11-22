import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import SourceControlPanel from './SourceControlPanel';
import LineChart from '../../common/TrendLineChart';
import _ from 'lodash';
import TfvcLogo from '../../../imgs/TfvcLogo.png';  
import GitLogo from '../../../imgs/GitLogo.png';



// sampleTeamProjectData = [{title:'Team Title',codeSourcesList:[{title:'repoTitle',sourceLogo:GitLogo}]}]

export default class GitVSTfvcTab extends Component {
  
  teamProjectDataFactory(teamProjectArray={value:[]},repoArray=[],type='git'){
    let mergedData=[];

    if(teamProjectArray.value !== undefined){
      teamProjectArray.value.forEach(teamProject => {
       let project = {title:teamProject.name,codeSourcesList:[]};
        if(type==='git'){
            repoArray.forEach(teamRepos=>{
                teamRepos.forEach(repo=>{
                if(repo.project.id === teamProject.id){
                  project.codeSourcesList.push({title:repo.name,id:repo.id,sourceLogo:GitLogo})
              }})//foreach
            })//foreach
          if(project.codeSourcesList.length > 0){mergedData.push(project);}
        }else{//TFVC
          repoArray.forEach(teamRepos=>{
              if(teamRepos.count > 0){
                if(_.includes(teamRepos.value[0].url,teamProject.id)){
                //we have TFVC src
                let repoName = teamRepos.value[0].path.substr(2);
                project.codeSourcesList.push({title:repoName,id:repoName,sourceLogo:TfvcLogo})
              }//if
            }//if
          })//foreach
          if(project.codeSourcesList.length > 0){mergedData.push(project);}
        }//if
      })//foreach
    }//if
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
            <SourceControlPanel teamProjectData={this.teamProjectDataFactory(this.props.globalData.teamProjectsData,this.props.codeData.gitRepos,'git')}
                                sourceControlType='git'
                                sumOfRepos={this.props.sumOfGitRepos}
                                sourceControlLogo={GitLogo}/>
          </Grid>
          <Grid item sm={6}>
            <SourceControlPanel teamProjectData={this.teamProjectDataFactory(this.props.globalData.teamProjectsData,this.props.codeData.tfvcRepos,'TFVC')}
                                sourceControlType='TFVC'
                                sumOfRepos={this.props.sumOfTFVCRepos} 
                                sourceControlLogo={TfvcLogo}/>  
          </Grid>
        </Grid>
      </div>
    )
  }
}
