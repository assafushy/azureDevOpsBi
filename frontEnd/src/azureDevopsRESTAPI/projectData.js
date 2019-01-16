import Config from '../configFiles/config';
import axios from 'axios';

//fetches all teamProjects
export async function getProjectList(collection) { 
  let top = 1024;
  //https://assafushy.visualstudio.com/defaultcollection/_apis/projects?api-version=1.0
    return axios.get(`${Config.BASE_URL}/_apis/projects?$top=${top}&api-version=4.0`);
}//getProjectList
