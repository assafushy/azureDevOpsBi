import axios from 'axios';
import moment from 'moment';



//GIT---------------------------------------------------------------
  //fetches all Git Repos by teamProjects
export async function fetchAllGitReposByTeamProject(teamProjectId) { 
  //https://assafushy.visualstudio.com/0cc08e1d-c1c7-47ef-9d20-298e9764f26f/_apis/git/repositories?api-version=4.1
  return await axios.get(`https://assafushy.visualstudio.com/${teamProjectId}/_apis/git/repositories?api-version=4.1`);
}//fetchAllGitReposByTeamProject
 
  //fetches all Git pushes to a repo in dates
export async function fetchAllGitRepoPushesByTeamProject(RepoData,fromDate=undefined,toDate=undefined) { 
  //Default values for date - one month ago
  if(!fromDate){fromDate = moment().subtract(1,'months').toISOString();}
  if(!toDate){toDate = moment().toISOString();}  
  //https://assafushy.visualstudio.com/0cc08e1d-c1c7-47ef-9d20-298e9764f26f/_apis/git/repositories/4bd4d6c4-462f-4f3f-8458-8366f0bf3501/pushes?searchCriteria.toDate=2018-11-22T17:53:41.726Z&searchCriteria.fromDate=2016-01-22T17:53:41.726Z
  console.log(`https://assafushy.visualstudio.com/${RepoData.project.id}/_apis/git/repositories/${RepoData.id}/pushes?searchCriteria.toDate=${toDate}&searchCriteria.fromDate=${fromDate}`);
  return await axios.get(`https://assafushy.visualstudio.com/${RepoData.project.id}/_apis/git/repositories/${RepoData.id}/pushes?searchCriteria.toDate=${toDate}&searchCriteria.fromDate=${fromDate}`);
}//fetchAllGitRepoPushesByTeamProject
  
//TFVC---------------------------------------------------------------

 //fetches all TFVC Items by teamProjects
export function fetchAllTFVCReposByTeamProject(teamProjectId) { 
  //https://assafushy.visualstudio.com/0cc08e1d-c1c7-47ef-9d20-298e9764f26f/_apis/tfvc/items
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
export function getChartsData(){
    return {
      "labels":['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      "gitActiveReposByMonth":[1,4,6,7,7,7,9,10,24,56,45,23],
      "TFVCActiveReposByMonth":[23,18,15,15,15,6,17,12,23,12,8,3],
    }; 
}//getChartsData
