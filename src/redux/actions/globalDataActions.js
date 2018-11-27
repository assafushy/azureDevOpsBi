import store from '../store';
import C from '../../configFiles/constants.json';
import {getProjectList} from '../../azureDevopsRESTAPI/projectData';
import {fetchAllGitReposetories,fetchAllTFVCReposetories,fetchSrcContorlTrendChartData} from './codeDataActions';

import _ from 'lodash';

export function fetchAllServerProjects(){   
  let projectData=[];
  // store.dispatch(isLoading(true));
  const req = getProjectList();
    return (dispatch)=>{  
      return req.then((data)=>{
        projectData=data.data.value;
        dispatch({type:C.FETCH_PROJECTS,payload:data.data})     
    ;})
    .then(()=>{
      fetchAllGitReposetories(projectData);
      fetchAllTFVCReposetories(projectData);
      fetchSrcContorlTrendChartData(projectData);
    })
  }//dispatch
}

export function SelectedDeselectProjects(projectId){   
 let teamProjectArray = store.getState().globalData.teamProjectsData.value;
 
 let i = _.findIndex(teamProjectArray,(o)=>o.id ===projectId);
  if(i!==-1){
    if(teamProjectArray[i].selected){teamProjectArray[i].selected=false}
    else{
      if(teamProjectArray[i].selected === undefined){
        teamProjectArray[i].selected=false
      }else{
        teamProjectArray[i].selected=true
      }//if 
    }//if
  }//if

    return {
        type:C.SELECT_PROJECT,
        payload:teamProjectArray
    }

}//SelectedDeselectProjects
