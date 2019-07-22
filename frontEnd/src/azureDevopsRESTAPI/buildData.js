import Config from "../configFiles/config";
import axios from "axios";
import _ from "lodash";

//fetches all Build Definitions for git repo
export async function fetchAllBuildDefinitionsForGitRepo(RepoData) {
  let res;
  //https://assafushy.visualstudio.com/0cc08e1d-c1c7-47ef-9d20-298e9764f26f/_apis/build/definitions?includeAllProperties=true&repositoryType=TfsGit&repositoryId=4bd4d6c4-462f-4f3f-8458-8366f0bf3501
  try {
    // console.log(`${Config.BASE_URL}/${RepoData.project.id}/_apis/build/definitions?includeAllProperties=true&repositoryType=TfsGit&repositoryId=${RepoData.id}`);
    res = await axios.get(
      `${Config.BASE_URL}/${
        RepoData.project.id
      }/_apis/build/definitions?includeAllProperties=true&repositoryType=TfsGit&repositoryId=${
        RepoData.id
      }`
    );
  } catch (error) {
    console.log(
      `error :  ${JSON.stringify(error)} happened in ${RepoData.project.id}`
    );
    return {};
  }
  return res;
} //fetchAllBuildDefinitionsForGitRepo

//get all active git repos build defenitions for project array
export async function fetchAllActiveGitReposBuildDefenitions(
  teamProjectsList,
  gitReposList
) {
  let buildDefentionList = { count: 0, CICount: 0, value: [] };

  await Promise.all(
    teamProjectsList.map(async teamProject => {
      //filter all project Repos
      let projectRepoList = _.filter(
        gitReposList,
        repo => repo.project.id === teamProject.id
      );
      //skips projects with no active repos
      if (projectRepoList.length > 0) {
        let projectData = await getProjectData(teamProject, projectRepoList);
        buildDefentionList.count += projectData.count;
        buildDefentionList.CICount += projectData.CICount;
        buildDefentionList.value.push(projectData);
      } else {
        console.log(`no active repos for ${JSON.stringify(teamProject)}`);
      }
    }) //.map
  ); //Promise.all

  // console.log(projectBuildObject);

  return buildDefentionList;
} //fetchAllActiveGitRepos

async function getProjectData(teamProject, projectRepoList) {
  let projectBuildObject = {
    id: teamProject.id,
    name: teamProject.name,
    repoCount: 0,
    count: 0,
    CICount: 0,
    repoList: []
  };

  await Promise.all(
    projectRepoList.map(async repo => {
      projectBuildObject.repoCount += 1;
      let repoData = await getRepoData(repo);
      projectBuildObject.count += repoData.count;
      projectBuildObject.CICount += repoData.CICount;
      projectBuildObject.repoList.push(repoData);
    })
  );

  return projectBuildObject;
} //getProjectData

async function getRepoData(repo) {
  let repoData = {
    id: repo.id,
    name: repo.name,
    count: 0,
    CICount: 0,
    buildDefentionList: []
  };

  let req = await fetchAllBuildDefinitionsForGitRepo(repo);
  let repoBuildDefenitions = req.data;

  if (repoBuildDefenitions.count > 0) {
    //summing all the counts
    repoData.count = repoBuildDefenitions.count;
    repoData.buildDefentionList = repoBuildDefenitions.value;

    let isCI = await isCIBuild(repoData.buildDefentionList);
    console.log(`for repo ${repoData.name} CI is ${isCI}`);
    if (isCI) {
      repoData.CICount += 1;
    }
  }

  return repoData;
} //getRepoData

async function isCIBuild(buildDefentionList) {
  let isCI = false;
  console.log(buildDefentionList);
  await Promise.all(
    buildDefentionList.map(async buildDefenetion => {
      await Promise.all(
        buildDefenetion.triggers.map(trigger => {
          console.log(trigger);
          if (trigger.triggerType === "continuousIntegration") {
            isCI = true;
          } //if
        }) //.map
      ); //Promise.all
    }) //.map
  ); //Promise.all
  if (isCI) {
    return true;
  } else {
    return false;
  }
} //isCIBuild
