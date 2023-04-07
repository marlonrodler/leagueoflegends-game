import axios from "axios";

const championsSummary = axios.create({
  baseURL: "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/pt_br/v1/champion-summary.json",
});

export default championsSummary;
