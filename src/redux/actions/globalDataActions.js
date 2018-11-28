import store from '../store';
import C from '../../configFiles/constants.json';
import {getProjectList} from '../../azureDevopsRESTAPI/projectData';
import {fetchAllGitReposetories,fetchAllTFVCReposetories,fetchSrcContorlTrendChartData} from './codeDataActions';

import _ from 'lodash';
import { updateLocale } from 'moment';

export function fetchAllServerProjects(){   
  let projectData=[];
  let selectedProjects;
  // store.dispatch(isLoading(true));
  const req = getProjectList();
    return (dispatch)=>{  
      return req.then((data)=>{
        projectData=data.data.value;
        dispatch({type:C.FETCH_PROJECTS,payload:data.data})     
    ;})
    .then(()=>{
      let globalData = store.getState().globalData.teamProjectsData.value;
      selectedProjects = globalData.filter((teamProject)=>{
        if(teamProject.selected === undefined || teamProject.selected === true ){
          return teamProject;
        }
      })//filter
      console.log(`selected is: ${selectedProjects}`);
      store.dispatch({type:C.SELECT_PROJECT,payload:selectedProjects});
    })
    .then(()=>{
      UpdateGlobalState(selectedProjects)
    })
  }//dispatch
}//fetchAllServerProjects

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

export function setSelectedProjects(){ 
  let selectedProjects;
    
  let globalData = store.getState().globalData.teamProjectsData.value;
  selectedProjects = globalData.filter((teamProject)=>{
    if(teamProject.selected === undefined || teamProject.selected === true ){
      return teamProject;
    }
  })//filter
  console.log(`selected is: ${selectedProjects}`);
  store.dispatch({type:C.SELECT_PROJECT,payload:selectedProjects});
  UpdateGlobalState(selectedProjects);
}//fetchAllServerProjects


export function UpdateGlobalState(selectedProjects){
  fetchAllGitReposetories(selectedProjects);
  fetchAllTFVCReposetories(selectedProjects);
  fetchSrcContorlTrendChartData(selectedProjects);
}

