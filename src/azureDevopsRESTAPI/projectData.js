import Config from '../configFiles/config';
import axios from 'axios';

//fetches all teamProjects
export async function getProjectList(collection) { 
  //https://assafushy.visualstudio.com/defaultcollection/_apis/projects?api-version=1.0
    return axios.get(`${Config.BASE_URL}/_apis/projects?api-version=1.0`);
}//getProjectList
