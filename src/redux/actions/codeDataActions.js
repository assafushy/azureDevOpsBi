import C from '../../configFiles/constants.json';
import {fetchAllGitReposByTeamProject,fetchAllTFVCReposByTeamProject,
  fetchAllTFVCChangeSetsByTeamProject,fetchAllGitRepoPushesByTeamProject,
  getChartsData} from '../../azureDevopsRESTAPI/codeData';
import store from '../store';


export async function fetchAllGitReposetories(teamProjectsList=[]){   
  let reposList=[]
  
  let resArr = await Promise.all(teamProjectsList.map((teamProject)=>{
    return fetchAllGitReposByTeamProject(teamProject.id);
  }));//Promise.all


  //gets only for projects with repos - the active Repos
  reposList = await Promise.all(resArr.map(async (res,i)=>{
    let gitRepos= [];

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
  return async (dispatch)=>{
      let data = await getChartsData();
      dispatch({type:C.FETCH_SRC_CONTROL_TREND_CHART_DATA,payload:data})
  }
}//fetchSrcContorlTrendChartData

