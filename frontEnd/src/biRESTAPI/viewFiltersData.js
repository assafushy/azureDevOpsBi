import Config from '../configFiles/config';
import axios from 'axios';
import _ from 'lodash';


//fetches all Build Definitions for git repo
export async function fetchAllViewFilters() { 
  let res;
  try {
    // console.log(`${Config.BASE_URL}/${RepoData.project.id}/_apis/build/definitions?includeAllProperties=true&repositoryType=TfsGit&repositoryId=${RepoData.id}`);
    res = await axios.get(`${Config.BASE_URL}/${RepoData.project.id}/_apis/build/definitions?includeAllProperties=true&repositoryType=TfsGit&repositoryId=${RepoData.id}`);
  } catch (error) {
    console.log(`error :  ${JSON.stringify(error)} happened in ${RepoData.project.id}`);
    return {};
  }
  return res;
}//fetchAllBuildDefinitionsForGitRepo