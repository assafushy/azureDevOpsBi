import C from '../../configFiles/constants.json';
import {fetchAllGitReposByTeamProject,fetchAllTFVCReposByTeamProject,fetchAllTFVCChangeSetsByTeamProject,fetchAllGitRepoPushesByTeamProject} from '../../azureDevopsRESTAPI/codeData';
import store from '../store';
import _ from 'lodash';
import moment from 'moment';

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

export async function fetchSrcContorlTrendChartData(){
  
  let chartData = {
    "labels":['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    "gitActiveReposByMonth":[1,4,6,7,7,7,9,10,24,56,45,23],
    "TFVCActiveReposByMonth":[23,18,15,15,15,6,17,12,23,12,8,3],
  };


  return (dispatch)=>{
    dispatch({type:C.FETCH_SRC_CONTROL_TREND_CHART_DATA,payload:chartData});
  }
  
}//fetchSrcContorlTrendChartData

