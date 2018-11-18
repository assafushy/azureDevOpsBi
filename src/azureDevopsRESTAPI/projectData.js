import axios from 'axios';

export async function getProjectList(collection) { 
  //https://assafushy.visualstudio.com/defaultcollection/_apis/projects?api-version=1.0
    return axios.get('https://assafushy.visualstudio.com/defaultcollection/_apis/projects?api-version=1.0');
}//getProjectList