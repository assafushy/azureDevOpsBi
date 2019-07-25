import C from "../../configFiles/constants.json";
import {
  fetchAllTeamProjectsPolicies,
  fetchPoliciesByRepo
} from "../../azureDevopsRESTAPI/policyData";
import store from "../store";

export async function fetchAllPolicies(teamProjectsList = [], repoList = []) {
  return new Promise((resolve, reject) => {
    fetchPoliciesByRepo(repoList, teamProjectsList).then(policies => {
      store.dispatch({
        type: C.FETCH_TEAM_PROJECT_POLICIES,
        payload: policies
      });
      resolve(true);
    }); //.then
  }); //Promise
} //fetchAllGitReposetories
