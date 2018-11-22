import C from '../../configFiles/constants.json';
import {fetchAllGitReposByTeamProject,fetchAllTFVCReposByTeamProject,fetchAllTFVCChangeSetsByTeamProject,fetchAllGitRepoPushesByTeamProject} from '../../azureDevopsRESTAPI/codeData';
import store from '../store';
import _ from 'lodash';
export async function fetchAllGitReposetories(teamProjectsList=[]){   
  let reposList=[]
  
  let resArr = await Promise.all(teamProjectsList.map((teamProject)=>{
    return fetchAllGitReposByTeamProject(teamProject.id);
  }));//Promise.all


  //gets only for projects with repos - the active Repos
  reposList = await Promise.all(resArr.map(async (res,i)=>{
    let gitRepos= new Array();

    //console.log(res.data);
    if(res.data.count>0){
      res.data.value.forEach(async (repo,i)=>{
        let gitPushes = await fetchAllGitRepoPushesByTeamProject(repo);
        if(gitPushes.data.count>0){
          gitRepos.push(repo);
        }//if
      })//forEach
      return gitRepos;
    }//if
    return [];
  }));//Promise.all
 
  console.log(reposList)
  let filteredRepos = reposList.filter(val => (val!==[]));
  // let filteredRepos = _.filter(reposList,(o)=>{console.log(o);return (o.length>0)});
  console.log(filteredRepos);
  
  store.dispatch({type:C.FETCH_ALL_PROJECTS__GIT_REPOS,payload:reposList})
}//fetchAllGitReposetories

export async function fetchAllTFVCReposetories(teamProjectsList=[]){   
  let TFVCRepos = [];
  //gets teamProjectsTFVCRepos
  let resArr = await Promise.all(teamProjectsList.map((teamProject)=>{
    return fetchAllTFVCReposByTeamProject(teamProject.id);
  }));//Promise.all
   
  //gets only for projects with repos - the active Repos
  await Promise.all(resArr.map(async (res,i)=>{
    if(res.data.count>0){
      let changeSets = await fetchAllTFVCChangeSetsByTeamProject(teamProjectsList[i].id);
     if(changeSets.data.count > 0){
       TFVCRepos.push(res.data);
     }//if
    }//if
  }));//Promise.all
  store.dispatch({type:C.FETCH_ALL_PROJECTS__TFVC_REPOS,payload:TFVCRepos})
}//fetchAllTFVCReposetories
