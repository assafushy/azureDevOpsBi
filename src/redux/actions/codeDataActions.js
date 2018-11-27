import C from '../../configFiles/constants.json';
import {fetchAllGitReposByTeamProject,fetchAllTFVCReposByTeamProject,
  fetchAllTFVCChangeSetsByTeamProject,fetchAllGitRepoPushesByTeamProject,
  getSrcTrendChartsData,fetchAllActiveGitRepos} from '../../azureDevopsRESTAPI/codeData';
import store from '../store';


export async function fetchAllGitReposetories(teamProjectsList=[]){   
      fetchAllActiveGitRepos(teamProjectsList).then((reposList)=>{
        store.dispatch({type:C.FETCH_ALL_PROJECTS__GIT_REPOS,payload:reposList});
      })
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

export async function fetchSrcContorlTrendChartData(teamProjectsList=[]){ 
  getSrcTrendChartsData(teamProjectsList)
  .then((data)=>{
    console.log(`data  is : ${JSON.stringify(data)}`)
    store.dispatch({type:C.FETCH_SRC_CONTROL_TREND_CHART_DATA,payload:data})
  })
}//fetchSrcContorlTrendChartData

