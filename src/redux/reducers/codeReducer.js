import C from '../../configFiles/constants.json';

export default (state={
                    "gitRepos" : [],
                    }
                    ,action) =>{

    switch(action.type){
        case C.FETCH_ALL_PROJECTS__GIT_REPOS:
            return{...state,gitRepos:action.payload}
        default:
            return state;
            
    }
       
}