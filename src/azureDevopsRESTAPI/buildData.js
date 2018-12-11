import Config from '../configFiles/config';
import axios from 'axios';

//fetches all Build Definitions for git repo
export async function fetchAllBuildDefinitionsForGitRepo(RepoData) { 
  let res;
  //https://assafushy.visualstudio.com/0cc08e1d-c1c7-47ef-9d20-298e9764f26f/_apis/build/definitions?includeAllProperties=true&repositoryType=TfsGit&repositoryId=4bd4d6c4-462f-4f3f-8458-8366f0bf3501
  try {
    res = await axios.get(`${Config.BASE_URL}/${RepoData.project.id}/_apis/build/definitions?includeAllProperties=true&repositoryType=TfsGit&repositoryId=${RepoData.id}`);
  } catch (error) {
    console.log(`error :  ${JSON.stringify(error)} happened in ${RepoData.project.id}`);
    return {};
  }
  return res;
}//fetchAllBuildDefinitionsForGitRepo
    