import C from "../../configFiles/constants.json";

export default (
  state = {
    policyByTeamProject: []
  },
  action = null
) => {
  switch (action.type) {
    case C.FETCH_TEAM_PROJECT_POLICIES:
      return { ...state, policyByTeamProject: action.payload };
    default:
      return state;
  }
};
