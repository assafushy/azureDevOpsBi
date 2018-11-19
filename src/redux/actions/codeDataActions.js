import C from '../../configFiles/constants.json';
import {fetchAllGitReposByTeamProject} from '../../azureDevopsRESTAPI/codeData';
import store from '../store';

export async function fetchAllGitReposetories(teamProjectsList=[]){   
  let resArr = await Promise.all(teamProjectsList.map((teamProject)=>{
    return fetchAllGitReposByTeamProject(teamProject.id);
  }));//Promise.all
  let gitRepos = [];
  resArr.forEach((res)=>{
    gitRepos.push(res.data);
  });//forEach
  store.dispatch({type:C.FETCH_ALL_PROJECTS__GIT_REPOS,payload:gitRepos})
}//fetchAllGitReposetories
