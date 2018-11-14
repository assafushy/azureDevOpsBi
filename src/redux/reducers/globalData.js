import C from '../../configFiles/constants.json';

export default (state={
                    "collectionData" : [],
                    "teamProjectsData": [],
                    }
                    ,action) =>{

    switch(action.type){
        // case C.CATALOG_IS_FETCHING:
        //     return{...state,fetchingCatalogData:action.payload}
        default:
            return state;
            
    }
       
}