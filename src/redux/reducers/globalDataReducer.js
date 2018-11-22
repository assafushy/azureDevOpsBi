import C from '../../configFiles/constants.json';

export default (state={
                    "collectionData" : [],
                    "selectedCollections":[],
                    "teamProjectsData": [],
                    "selectedTeamProject":[],
                    "globalSettings":{"activeRepoPeriodInMonths":1}
                    }
                    ,action) =>{

    switch(action.type){
        case C.FETCH_PROJECTS:
            return{...state,teamProjectsData:action.payload}
        case C.SELECT_PROJECT:
            return{...state,teamProjectsData:{...state.teamProjectsData,value:action.payload}}
        default:
            return state;
            
    }
       
}