import C from '../../configFiles/constants.json';

export default (state={
                    "collectionData" : [],
                    "selectedCollections":[],
                    "teamProjectsData": [],
                    "selectedTeamProject":{"value":[]},
                    "viewFilters":[],
                    "globalSettings":{"activeRepoPeriodInMonths":1}
                    }
                    ,action=null) =>{
  switch(action.type){
    case C.FETCH_PROJECTS:
      return{...state,teamProjectsData:action.payload}
    case C.FETCH_VIEW_FILTERS:
      return{...state,viewFilters:action.payload}   
    case C.SELECT_VIEW_FILTER:
      return{...state,teamProjectsData:action.payload}   
    case C.SELECT_PROJECT:
      return{...state,selectedTeamProject:{...state.teamProjectsData,value:action.payload}}
    default:
      return state;
  }      
}