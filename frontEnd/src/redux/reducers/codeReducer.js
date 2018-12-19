import C from '../../configFiles/constants.json';

export default (state={
									"gitRepos" : [],
									"tfvcRepos":[],
									"srcControlTrendChartData":{
										"labels":[],
										"gitActiveReposByMonth":[],
										"TFVCActiveReposByMonth":[],
									}
								}
                    ,action) =>{

    switch(action.type){
			case C.FETCH_ALL_PROJECTS__GIT_REPOS:
				return{...state,gitRepos:action.payload};
			case C.FETCH_ALL_PROJECTS__TFVC_REPOS:
				return{...state,tfvcRepos:action.payload};
			case C.FETCH_SRC_CONTROL_TREND_CHART_DATA:
				return{...state,srcControlTrendChartData:action.payload}
			default:
				return state;    
    }
       
}