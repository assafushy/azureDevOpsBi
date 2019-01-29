import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash';
import TeamProjectCard from './buildStatsComponents/TeamProjectCard';
import BuildPieChart from './buildStatsComponents/BuildPieChart';

export default class BuildStatsTab extends Component {
  
  teamProjectDataFactory(teamProjectArray={value:[]},repoArray=[],type='git'){
    let mergedData=[];
    if(teamProjectArray.value !== undefined){
      teamProjectArray.value.forEach(teamProject => {
       let project = {title:teamProject.name,codeSourcesList:[]};
        if(type==='git'){
            repoArray.forEach(repo=>{
                if(repo.project.id === teamProject.id){
                  project.codeSourcesList.push({title:repo.name,id:repo.id,sourceLogo:{}})
              }})//foreach
          if(project.codeSourcesList.length > 0){mergedData.push(project);}
        }else{//TFVC
          repoArray.forEach(teamRepos=>{
              if(teamRepos.count > 0){
                if(_.includes(teamRepos.value[0].url,teamProject.id)){
                //we have TFVC src
                let repoName = teamRepos.value[0].path.substr(2);
                project.codeSourcesList.push({title:repoName,id:repoName,sourceLogo:{}})
              }//if
            }//if
          })//foreach
          if(project.codeSourcesList.length > 0){mergedData.push(project);}
        }//if
      })//foreach
    }//if
    return mergedData;
  }//teamProjectDataFactory

  calculateBuildGraphData(totalNum,BuildNum,ciNum){
    let noBuild = totalNum - BuildNum;
    let noCi = BuildNum - ciNum;
    return[noBuild,noCi,ciNum];
  }//calculateBuildGraphData

  render() {
    return (
      <div>
        <br/>
        <Grid container spacing={12} > 
          <Grid item sm={12}>
            <BuildPieChart chartData={this.calculateBuildGraphData(
              this.props.repoData.count,
              this.props.buildData.buildDefentionsByGitRepos.count,
              this.props.buildData.buildDefentionsByGitRepos.CICount)}/>
          </Grid> 
          <Grid item sm={12}>
          { (this.props.buildData.buildDefentionsByGitRepos.value)?
            this.props.buildData.buildDefentionsByGitRepos.value.map((teamData,i)=>{
            return <TeamProjectCard key={i} data={teamData}/>
          }):null}
          </Grid>   
        </Grid>
      </div>
    )
  }
}
