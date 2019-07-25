import Config from "../configFiles/config";
import axios from "axios";
import _ from "lodash";
//Policies---------------------------------------------------------------
//fetches all Git Repos by teamProjects
export async function fetchAllPoliciesByTeamProject(teamProjectId) {
  try {
    return await axios.get(
      `${Config.BASE_URL}/${teamProjectId}/_apis/policy/configurations`
    );
  } catch (err) {
    console.log(err);
    return { count: 0, value: [] };
  }
} //fetchAllGitReposByTeamProject

//get all policies for team project list
export async function fetchAllTeamProjectsPolicies(teamProjectsList = []) {
  let allTeamsPolicies = [];
  await Promise.all(
    teamProjectsList.map(async teamProject => {
      let res = await fetchAllPoliciesByTeamProject(teamProject.id);
      let teamPolicies = { teamProject, policies: res.data.value };
      allTeamsPolicies.push(teamPolicies);
    }) //.map
  ); //Promise.all
  return allTeamsPolicies;
} //fetchAllActiveGitRepos

export async function fetchPoliciesByRepo(
  repoList = [],
  teamProjectsList = []
) {
  let allTeamsPolicies = await fetchAllTeamProjectsPolicies(teamProjectsList);

  return await Promise.all(
    teamProjectsList.map(async teamProject => {
      let teamProjectPolicies = _.find(
        allTeamsPolicies,
        teamProjectPolicies => {
          return teamProjectPolicies.teamProject.id === teamProject.id;
        }
      );
      return await getTeamProjectReposPolicies(
        teamProject,
        repoList,
        teamProjectPolicies
      );
    })
  ); //Promise.all
} //fetchPoliciesByRepo

async function getTeamProjectReposPolicies(
  teamProject,
  repoList,
  teamProjectPolicies
) {
  let projectPoliciesData = {
    id: teamProject.id,
    name: teamProject.name,
    repoList: []
  };

  await Promise.all(
    repoList.map(async repo => {
      if (repo.project.id === teamProject.id) {
        let repoPolicies = await getRepoPoliciesList(repo, teamProjectPolicies);
        projectPoliciesData.repoList.push(repoPolicies);
      } else {
        return false;
      }
    })
  );

  return projectPoliciesData;
} //getTeamProjectReposPolicies

async function getRepoPoliciesList(repo, teamProjectPolicies) {
  let repoPoliciesData = {
    id: repo.id,
    name: repo.name,
    policyList: []
  };

  await Promise.all(
    teamProjectPolicies.policies.map(async policy => {
      let isRepoScoped = false;
      try {
        await Promise.all(
          policy.settings.scope.map(scope => {
            if (repo.id === scope.repositoryId) {
              isRepoScoped = true;
            }
          })
        ); //.Promise.all
      } catch (err) {
        console.log(`error for object : ${JSON.stringify(policy)}`);
      }
      if (isRepoScoped) {
        console.log(`PUSHING TO POLICY LIST`);
        repoPoliciesData.policyList.push(policy);
      }
    })
  );
  return repoPoliciesData;
} //getRepoPoliciesList
