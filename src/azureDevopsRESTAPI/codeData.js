import axios from 'axios';
import moment from 'moment';

//GIT---------------------------------------------------------------
  //fetches all Git Repos by teamProjects
export async function fetchAllGitReposByTeamProject(teamProjectId) { 
  //https://assafushy.visualstudio.com/0cc08e1d-c1c7-47ef-9d20-298e9764f26f/_apis/git/repositories?api-version=4.1
  console.log(`https://assafushy.visualstudio.com/${teamProjectId}/_apis/git/repositories?api-version=4.1`)
  return await axios.get(`https://assafushy.visualstudio.com/${teamProjectId}/_apis/git/repositories?api-version=4.1`);
}//fetchAllGitReposByTeamProject
 
  //fetches all Git pushes to a repo in dates
export async function fetchAllGitRepoPushesByTeamProject(RepoData,fromDate=undefined,toDate=undefined) { 
  //Default values for date - one month ago
  if(fromDate){console.log(`fetch all pushes: https://assafushy.visualstudio.com/${RepoData.project.id}/_apis/git/repositories/${RepoData.id}/pushes?searchCriteria.toDate=${toDate}&searchCriteria.fromDate=${fromDate}`)}
  if(!fromDate){fromDate = moment().subtract(1,'months').toISOString();}
  if(!toDate){toDate = moment().toISOString();}  
  //https://assafushy.visualstudio.com/0cc08e1d-c1c7-47ef-9d20-298e9764f26f/_apis/git/repositories/4bd4d6c4-462f-4f3f-8458-8366f0bf3501/pushes?searchCriteria.toDate=2018-11-22T17:53:41.726Z&searchCriteria.fromDate=2016-01-22T17:53:41.726Z
  return await axios.get(`https://assafushy.visualstudio.com/${RepoData.project.id}/_apis/git/repositories/${RepoData.id}/pushes?searchCriteria.toDate=${toDate}&searchCriteria.fromDate=${fromDate}`);
}//fetchAllGitRepoPushesByTeamProject
  
  //get all active git repos for project array
export async function fetchAllActiveGitRepos(teamProjectsList,fromDate=undefined,toDate=undefined) { 
  console.log(`ran fetchAllActiveGitRepos with dates : ${fromDate} and ${toDate} `);
  console.log(teamProjectsList)
  return new Promise((resolve,reject)=>{
    Promise.all(teamProjectsList.map(async (teamProject)=>{
      return await fetchAllGitReposByTeamProject(teamProject.id);
    })).then((resArr)=>{
      if(fromDate){console.log(resArr)}
    //gets only for projects with repos - the active Repos
    Promise.all(resArr.map(async (res,i)=>{
      let gitRepos= [];
      if(res.data.count>0){
        res.data.value.forEach(async (repo,i)=>{
          fetchAllGitRepoPushesByTeamProject(repo,fromDate,toDate).then((gitPushes)=>{
            if(gitPushes.data.count>0){
              gitRepos.push(repo);
            }//if
          }) 
        })//forEach
        return gitRepos;
      }//if
      return [];  
    })).then((reposList)=>{
      resolve(reposList);
    })
  }).catch((error)=>{
    console.log(error)
  });
  })  
}//fetchAllActiveGitRepos
  

//TFVC---------------------------------------------------------------

 //fetches all TFVC Items by teamProjects
export function fetchAllTFVCReposByTeamProject(teamProjectId) { 
  return axios.get(`https://assafushy.visualstudio.com/${teamProjectId}/_apis/tfvc/items`);
}//getProjectList

  //fetches all TFVC Items by teamProjects
export async function fetchAllTFVCChangeSetsByTeamProject(teamProjectId,fromDate=undefined,toDate=undefined) { 
  //Default values for date - one month ago
  if(!fromDate){fromDate = moment().subtract(1,'months').toISOString();}
  if(!toDate){toDate = moment().toISOString();}  
  //https://assafushy.visualstudio.com/66933a67-49a2-4e7b-8577-744c6c0e4911/_apis/tfvc/changesets?searchCriteria.fromDate=2018-11-21T13:19:31.153Z&searchCriteria.toDate=2018-11-21T13:19:31.153Z
  return axios.get(`https://assafushy.visualstudio.com/${teamProjectId}/_apis/tfvc/changesets?searchCriteria.fromDate=${fromDate}&searchCriteria.toDate=${toDate}`);
}//getProjectList

//CODE CHARTS---------------------------------------------------------
export async function getSrcTrendChartsData(teamProjectsList=[]){
return new Promise((resolve,reject)=>{

  let labels =[];
  let gitActiveReposByMonth = [1,2,3,4,5,6,7,8,9,10,11,12];
  let TFVCActiveReposByMonth = [];
  
  for (let i = 0; i < 11 ; i++) {
    labels[11-i] = moment().subtract(i,'months').format('MMM');
  }
  
  Promise.all(gitActiveReposByMonth.map(async (element,i)=>{
    return await fetchAllActiveGitRepos(teamProjectsList,
      moment().subtract(i+1,'months').toISOString(),
      moment().subtract(i,'months').toISOString());
    })).then((resArr)=>{
      gitActiveReposByMonth=resArr;
    }).then(()=>{
      console.log(`promise all finished : ${JSON.stringify(gitActiveReposByMonth)}`)
      //iterate a year before
      resolve( {
        "labels":labels,
        "gitActiveReposByMonth":gitActiveReposByMonth,
        "TFVCActiveReposByMonth":[23,18,15,15,15,6,17,12,23,12,8,3],
      }) 
    })
  })//returnPromise
  }//getChartsData
