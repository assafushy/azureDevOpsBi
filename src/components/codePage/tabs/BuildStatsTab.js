import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash';
import TeamProjectCard from './buildStatsComponents/TeamProjectCard';


let sampleTeamProjectData = [{id:111,name:'project name',count:1,
                              repoList:[
                                {id:"2837gdhs-sdb2",name:'repo name',count:3,CICount:1,
                                  buildDefentionList:[]
                                },{id:"2837gdhs-sdb2",name:'repo name',count:3,CICount:0,
                                buildDefentionList:[]
                              },{id:"2837gdhs-sdb2",name:'repo name',count:0,CICount:0,
                              buildDefentionList:[]
                            }]
                            }]

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

  render() {
    return (
      <div>
        <br/>
        <Grid container spacing={12} > 
          <Grid item sm={12}>
              <h1 align="center">a placeholder for summery graph</h1>
          </Grid> 
          <Grid item sm={12}>
          { (this.props.buildData.buildDefentionsByGitRepos.value)?
            this.props.buildData.buildDefentionsByGitRepos.value.map((teamData,i)=>{
            return <TeamProjectCard data={teamData}/>
          }):null}
          </Grid>   
        </Grid>
      </div>
    )
  }
}
