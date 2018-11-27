import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';

//GIT---------------------------------------------------------------
  //fetches all Git Repos by teamProjects
export async function fetchAllGitReposByTeamProject(teamProjectId) { 
  //https://assafushy.visualstudio.com/0cc08e1d-c1c7-47ef-9d20-298e9764f26f/_apis/git/repositories?api-version=4.1
  console.log(`https://assafushy.visualstudio.com/${teamProjectId}/_apis/git/repositories?api-version=4.1`)
  return await axios.get(`https://assafushy.visualstudio.com/${teamProjectId}/_apis/git/repositories?api-version=4.1`);
}//fetchAllGitReposByTeamProject
 
  //fetches all Git pushes to a repo in dates
export async function fetchAllGitRepoPushesByTeamProject(RepoData,fromDate=undefined,toDate=undefined) { 
  //Default values for date - one month ago
  if(fromDate){console.log(`fetch all pushes: https://assafushy.visualstudio.com/${RepoData.project.id}/_apis/git/repositories/${RepoData.id}/pushes?searchCriteria.toDate=${toDate}&searchCriteria.fromDate=${fromDate}`)}
  if(!fromDate){fromDate = moment().subtract(1,'months').toISOString();}
  if(!toDate){toDate = moment().toISOString();}  
  //https://assafushy.visualstudio.com/0cc08e1d-c1c7-47ef-9d20-298e9764f26f/_apis/git/repositories/4bd4d6c4-462f-4f3f-8458-8366f0bf3501/pushes?searchCriteria.toDate=2018-11-22T17:53:41.726Z&searchCriteria.fromDate=2016-01-22T17:53:41.726Z
  return await axios.get(`https://assafushy.visualstudio.com/${RepoData.project.id}/_apis/git/repositories/${RepoData.id}/pushes?searchCriteria.toDate=${toDate}&searchCriteria.fromDate=${fromDate}`);
}//fetchAllGitRepoPushesByTeamProject
  
  //get all active git repos for project array
export async function fetchAllActiveGitRepos(teamProjectsList,fromDate=undefined,toDate=undefined) { 
  
  let activeReposSum = {"count":0,"value":[]};
  
  await Promise.all(teamProjectsList.map(async (teamProject)=>{
    // console.log(`running for ${JSON.stringify(teamProject)}`);
    //get all project Repos
    let req =  await fetchAllGitReposByTeamProject(teamProject.id);
    let projectGitRepos = req.data;
    let activeReposArr =[];
    // console.log(`checking repos ${JSON.stringify(projectGitRepos)}`)
    if(projectGitRepos.count>0){
      //iterate project repos and check if active
      activeReposArr = await Promise.all(projectGitRepos.value.map(async (repo)=>{
        let req = await fetchAllGitRepoPushesByTeamProject(repo,fromDate,toDate);
        let pushes = req.data;
        // console.log(`pushes : ${JSON.stringify(pushes)}`)
        if(pushes.count > 0){
          activeReposSum.count += 1
          activeReposSum.value.push(repo);
          return repo;
        }else{
          return null
        }
      })
      )//Promise.all
    }else{
      return null
    }
    return activeReposArr;
      }))
  console.log(`Sum Repos :`);
  console.log(activeReposSum);
  return activeReposSum;
}//fetchAllActiveGitRepos
  

//TFVC---------------------------------------------------------------

 //fetches all TFVC Items by teamProjects
export function fetchAllTFVCReposByTeamProject(teamProjectId) { 
  return axios.get(`https://assafushy.visualstudio.com/${teamProjectId}/_apis/tfvc/items`);
}//getProjectList

  //fetches all TFVC Items by teamProjects
export async function fetchAllTFVCChangeSetsByTeamProject(teamProjectId,fromDate=undefined,toDate=undefined) { 
  //Default values for date - one month ago
  if(!fromDate){fromDate = moment().subtract(1,'months').toISOString();}
  if(!toDate){toDate = moment().toISOString();}  
  //https://assafushy.visualstudio.com/66933a67-49a2-4e7b-8577-744c6c0e4911/_apis/tfvc/changesets?searchCriteria.fromDate=2018-11-21T13:19:31.153Z&searchCriteria.toDate=2018-11-21T13:19:31.153Z
  return axios.get(`https://assafushy.visualstudio.com/${teamProjectId}/_apis/tfvc/changesets?searchCriteria.fromDate=${fromDate}&searchCriteria.toDate=${toDate}`);
}//getProjectList

//CODE CHARTS---------------------------------------------------------
export async function getSrcTrendChartsData(teamProjectsList=[]){

  let labels =[];
  let gitActiveReposByMonth = [];
  let TFVCActiveReposByMonth = [];
  
  for (let i = 0; i <= 11 ; i++) {
    labels[11-i] = moment().subtract(i,'months').format('MMM');
    let monthActiveRepos = await fetchAllActiveGitRepos(teamProjectsList,
        moment().subtract(i+1,'months').toISOString(),
        moment().subtract(i,'months').toISOString());
    gitActiveReposByMonth[11-i]= monthActiveRepos.count;
  }//for
 
    
      
  return {
        "labels":labels,
        "gitActiveReposByMonth":gitActiveReposByMonth,
        "TFVCActiveReposByMonth":[0,0,0,0,0,0,0,0,0,0,0,0],
        }
     
  }//getChartsData
  