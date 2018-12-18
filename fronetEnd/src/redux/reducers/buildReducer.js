import C from '../../configFiles/constants.json';

export default (state={
									"buildDefentionsByGitRepos" : []
									}
                    ,action) =>{

    switch(action.type){
			case C.FETCH_BUILD_DEFENITIONS_GIT_REPOS:
				return{...state,buildDefentionsByGitRepos:action.payload};
			default:
				return state;    
    }
       
}