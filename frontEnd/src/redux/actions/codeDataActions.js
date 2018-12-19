import C from '../../configFiles/constants.json';
import {fetchAllTFVCReposByTeamProject,
  fetchAllTFVCChangeSetsByTeamProject,
  getSrcTrendChartsData,fetchAllActiveGitRepos} from '../../azureDevopsRESTAPI/codeData';
import store from '../store';


export async function fetchAllGitReposetories(teamProjectsList=[]){   
  return new Promise((resolve,reject)=>{
    fetchAllActiveGitRepos(teamProjectsList).then((reposList)=>{
        store.dispatch({type:C.FETCH_ALL_PROJECTS__GIT_REPOS,payload:reposList});
        resolve(true);
    })//.then
  })//Ptomise  
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
  return true;
}//fetchAllTFVCReposetories

export async function fetchSrcContorlTrendChartData(teamProjectsList=[]){ 
  return new Promise((resolve,reject)=>{
    getSrcTrendChartsData(teamProjectsList)
    .then((data)=>{
      store.dispatch({type:C.FETCH_SRC_CONTROL_TREND_CHART_DATA,payload:data});
      resolve();
    })//.then
  })//Promise
}//fetchSrcContorlTrendChartData

