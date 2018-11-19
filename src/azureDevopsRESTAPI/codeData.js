import axios from 'axios';


//fetches all Git Repos by teamProjects
export function fetchAllGitReposByTeamProject(teamProjectId) { 
  //https://assafushy.visualstudio.com/0cc08e1d-c1c7-47ef-9d20-298e9764f26f/_apis/git/repositories?api-version=4.1
    return axios.get(`https://assafushy.visualstudio.com/${teamProjectId}/_apis/git/repositories?api-version=4.1`);
}//getProjectList