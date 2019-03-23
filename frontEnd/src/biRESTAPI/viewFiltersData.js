import Config from '../configFiles/config';
import axios from 'axios';

//fetches all ViewFilters form DB
export async function fetchAllViewFilters() { 
  let res;
  try {
    // console.log(`${Config.BASE_URL}/${RepoData.project.id}/_apis/build/definitions?includeAllProperties=true&repositoryType=TfsGit&repositoryId=${RepoData.id}`);
    res = await axios.get(`${Config.BI_API_BASE_URL}/viewFilter`);
  } catch (error) {
    console.log(`error :  ${JSON.stringify(error)}`);
    return {};
  }
  return res;
}//fetchAllBuildDefinitionsForGitRepo

export async function postNewViewFilter(newViewFilter){
  let res;
  try {
    // console.log(`${Config.BASE_URL}/${RepoData.project.id}/_apis/build/definitions?includeAllProperties=true&repositoryType=TfsGit&repositoryId=${RepoData.id}`);
    res = await axios.post(`${Config.BI_API_BASE_URL}/viewFilter`,newViewFilter);
  } catch (error) {
    console.log(`error :  ${JSON.stringify(error)}`);
    return {};
  }
  return res;
}