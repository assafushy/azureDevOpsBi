import Config from "../configFiles/config";
import axios from "axios";

export async function getCurrentIterationForTeam(team) {
  return axios.get(
    `${
      Config.BASE_URL
    }/${team}/_apis/work/teamsettings/iterations?$timeframe=current&api-version=4.1`
  );
}
