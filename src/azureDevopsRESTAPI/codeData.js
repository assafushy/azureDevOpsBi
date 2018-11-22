import axios from 'axios';


//fetches all Git Repos by teamProjects
export function fetchAllGitReposByTeamProject(teamProjectId) { 
  //https://assafushy.visualstudio.com/0cc08e1d-c1c7-47ef-9d20-298e9764f26f/_apis/git/repositories?api-version=4.1
  return axios.get(`https://assafushy.visualstudio.com/${teamProjectId}/_apis/git/repositories?api-version=4.1`);
}//getProjectList

//fetches all TFVC Items by teamProjects
export function fetchAllTFVCReposByTeamProject(teamProjectId) { 
  //https://assafushy.visualstudio.com/0cc08e1d-c1c7-47ef-9d20-298e9764f26f/_apis/tfvc/items
  return axios.get(`https://assafushy.visualstudio.com/${teamProjectId}/_apis/tfvc/items`);
}//getProjectList

//fetches all TFVC Items by teamProjects
export function fetchAllTFVCChangeSetsByTeamProject(teamProjectId,fromDate,toDate) { 
  //https://assafushy.visualstudio.com/66933a67-49a2-4e7b-8577-744c6c0e4911/_apis/tfvc/changesets?searchCriteria.fromDate=2018-11-21T13:19:31.153Z&searchCriteria.toDate=2018-11-21T13:19:31.153Z
  return axios.get(`https://assafushy.visualstudio.com/${teamProjectId}/_apis/tfvc/changesets?searchCriteria.fromDate=${fromDate}&searchCriteria.toDate=${toDate}`);
}//getProjectList
