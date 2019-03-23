import Config from '../configFiles/config';
import axios from 'axios';
import _ from 'lodash';

//fetches all Build Definitions for git repo
export async function fetchAllBuildDefinitionsForGitRepo(RepoData) { 
  let res;
  //https://assafushy.visualstudio.com/0cc08e1d-c1c7-47ef-9d20-298e9764f26f/_apis/build/definitions?includeAllProperties=true&repositoryType=TfsGit&repositoryId=4bd4d6c4-462f-4f3f-8458-8366f0bf3501
  try {
    // console.log(`${Config.BASE_URL}/${RepoData.project.id}/_apis/build/definitions?includeAllProperties=true&repositoryType=TfsGit&repositoryId=${RepoData.id}`);
    res = await axios.get(`${Config.BASE_URL}/${RepoData.project.id}/_apis/build/definitions?includeAllProperties=true&repositoryType=TfsGit&repositoryId=${RepoData.id}`);
  } catch (error) {
    console.log(`error :  ${JSON.stringify(error)} happened in ${RepoData.project.id}`);
    return {};
  }
  return res;
}//fetchAllBuildDefinitionsForGitRepo
    
//get all active git repos build defenitions for project array
export async function fetchAllActiveGitReposBuildDefenitions(teamProjectsList,gitReposList) { 

  let buildDefentionList = {count:0,CICount:0,value:[]};
  
  await Promise.all(teamProjectsList.map(async (teamProject)=>{
    let projectBuildObject = {id:teamProject.id,name:teamProject.name,repoCount:0,count:0,CICount:0,repoList:[]}
    //filter all project Repos
    let projectRepoList = _.filter(gitReposList,repo=>repo.project.id === teamProject.id);
    //skips projects with no active repos
    if(projectRepoList.length > 0){
      let finalRepoList = await Promise.all(projectRepoList.map(async (repo)=>{
          projectBuildObject.repoCount += 1;
          let repoData = {id:repo.id,name:repo.name,count:0,CICount:0,buildDefentionList:[]};
          let req = await fetchAllBuildDefinitionsForGitRepo(repo);
          let repoBuildDefenitions = req.data;
          // console.log(`repo: ${repo.id} bulid defenitions: ${JSON.stringify(repoBuildDefenitions)}`);  
          if(repoBuildDefenitions.count > 0){
            // console.log(repoBuildDefenitions);
            //summing all the counts
            repoData.count = repoBuildDefenitions.count;
            projectBuildObject.count += repoBuildDefenitions.count;
            buildDefentionList.count += repoBuildDefenitions.count;
  
            repoData.buildDefentionList = repoBuildDefenitions.value;

            await Promise.all(repoData.buildDefentionList.map(async (buildDefenetion)=>{
              let isCI = false;
              await Promise.all(buildDefenetion.triggers.map((trigger)=>{
                if(trigger.triggerType === "continuousIntegration"){
                  if(!isCI){
                    repoData.CICount += 1;
                    projectBuildObject.CICount += 1;
                    buildDefentionList.CICount += 1;
                    isCI = true;
                  }//if
                }//if
                return true;
              }))//Promise.all
            }))//Promise.all
          }else{
            // console.log(`no build defenitions`);
          }//if
            return repoData;
        })//map
      )//Promise.all
      projectBuildObject.repoList = finalRepoList;
      // console.log(projectBuildObject);
      buildDefentionList.value.push(projectBuildObject);
    }else{
      // console.log(`no active repos for ${JSON.stringify(teamProject)}`)
    }
  })//.map
  )//Promise.all
  return buildDefentionList;
}//fetchAllActiveGitRepos
