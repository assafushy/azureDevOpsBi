import C from '../../configFiles/constants.json';
import {fetchAllActiveGitReposBuildDefenitions} from '../../azureDevopsRESTAPI/buildData';
import store from '../store';


export async function fetchAllBuildDefinitions(teamProjectsList=[]){   
  return new Promise((resolve,reject)=>{
    let repoList = store.getState().codeData.gitRepos.value;
    fetchAllActiveGitReposBuildDefenitions(teamProjectsList,repoList).then((buildList)=>{
        store.dispatch({type:C.FETCH_BUILD_DEFENITIONS_GIT_REPOS,payload:buildList});
        resolve(true);
    })//.then
  })//Ptomise  
}//fetchAllGitReposetories
