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