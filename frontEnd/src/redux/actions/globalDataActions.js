import store from "../store";
import C from "../../configFiles/constants.json";
import {
  fetchAllViewFilters,
  postNewViewFilter
} from "../../biRESTAPI/viewFiltersData";
import { getProjectList } from "../../azureDevopsRESTAPI/projectData";
import {
  fetchAllGitReposetories,
  fetchAllTFVCReposetories,
  fetchSrcContorlTrendChartData
} from "./codeDataActions";
import { fetchAllBuildDefinitions } from "./buildDefenitionsDataActions";
import { fetchAllPolicies } from "./policyDataActions";

import _ from "lodash";
let moment = require("moment");

export function fetchAllServerProjects() {
  let selectedProjects;
  // store.dispatch(isLoading(true));
  const req = getProjectList();
  return dispatch => {
    return req
      .then(data => {
        dispatch({ type: C.FETCH_PROJECTS, payload: data.data });
        fetchViewFilters();
      })
      .then(() => {
        let globalData = store.getState().globalData.teamProjectsData.value;
        selectedProjects = globalData.filter(teamProject => {
          if (
            teamProject.selected === undefined ||
            teamProject.selected === true
          ) {
            return teamProject;
          }
          return false;
        }); //filter
        store.dispatch({ type: C.SELECT_PROJECT, payload: selectedProjects });
      })
      .then(() => {
        UpdateGlobalState(selectedProjects);
      });
  }; //dispatch
} //fetchAllServerProjects

export function SelectedDeselectProjects(projectId) {
  let teamProjectArray = store.getState().globalData.teamProjectsData.value;

  let i = _.findIndex(teamProjectArray, o => o.id === projectId);
  if (i !== -1) {
    if (teamProjectArray[i].selected) {
      teamProjectArray[i].selected = false;
    } else {
      if (teamProjectArray[i].selected === undefined) {
        teamProjectArray[i].selected = false;
      } else {
        teamProjectArray[i].selected = true;
      } //if
    } //if
  } //if

  return {
    type: C.SELECT_PROJECT,
    payload: teamProjectArray
  };
} //SelectedDeselectProjects

//sets the selected projects - if supplied with viewFilter then sets the selected to the viewFilter
export function setSelectedProjects(viewFilter) {
  let selectedProjects;
  let globalData;

  if (viewFilter) {
    switch (viewFilter) {
      case "select":
        break;
      case "deselect":
        break;
      default:
        globalData = viewFilter.projectList.value;
        // console.log(globalData);
        break;
    } //switch
  } else {
    globalData = store.getState().globalData.teamProjectsData.value;
  }

  switch (viewFilter) {
    case "select":
      globalData = store.getState().globalData.teamProjectsData.value;
      selectedProjects = globalData.map(teamProject => {
        teamProject.selected = true;
        return teamProject;
      }); //map
      break;
    case "deselect":
      globalData = store.getState().globalData.teamProjectsData.value;
      selectedProjects = globalData.map(teamProject => {
        teamProject.selected = false;
        return teamProject;
      }); //map
      break;
    default:
      try {
        selectedProjects = globalData.filter(teamProject => {
          if (
            teamProject.selected === undefined ||
            teamProject.selected === true
          ) {
            return teamProject;
          }
          return false;
        }); //filter
      } catch (error) {
        // console.log(`globalData recieved was: ${globalData}`);
        selectedProjects = [];
      }
      break;
  } //switch

  store.dispatch({ type: C.SELECT_PROJECT, payload: globalData });
  UpdateGlobalState(selectedProjects);
} //setSelectedProjects

export async function UpdateGlobalState(selectedProjects) {
  console.log("started updateGlobalState");
  await fetchSrcData(selectedProjects);
  fetchBuildData(selectedProjects);
  let repoList = store.getState().codeData.gitRepos.value;
  fetchAllPolicies(selectedProjects, repoList);
  console.log("finished updateGlobalState");
} //UpdateGlobalState

export async function fetchSrcData(selectedProjects) {
  await fetchAllGitReposetories(selectedProjects);
  await fetchAllTFVCReposetories(selectedProjects);
  fetchSrcContorlTrendChartData(selectedProjects);
} //fetchSrcData

export async function fetchBuildData(selectedProjects) {
  fetchAllBuildDefinitions(selectedProjects);
  console.log("fetching build data");
} //fetchBuildData

export async function fetchViewFilters() {
  let res = await fetchAllViewFilters();
  // console.log(`viewFilters list : ${JSON.stringify(res.data)}`);
  let data = [];
  res.data ? (data = res.data) : (data = []);
  store.dispatch({ type: C.FETCH_VIEW_FILTERS, payload: data });
} //fetchViewFilters

export async function saveNewViewFilter(
  newViewFilterTitle,
  createdBy = "Default"
) {
  let filterProjectList = store.getState().globalData.selectedTeamProject;
  let currentDate = moment().format();
  let newViewFilter = {
    title: newViewFilterTitle,
    createdBy: createdBy,
    changeDates: [{ date: currentDate, changedBy: createdBy }],
    projectList: filterProjectList
  };

  // console.log(newViewFilter);
  let res = await postNewViewFilter(newViewFilter);
  console.log(`post view filter respones:`);
  // console.log(res);
  fetchViewFilters();
} //saveNewViewFilter
