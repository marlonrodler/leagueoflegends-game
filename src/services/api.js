import axios from "axios";

const api = axios.create({
  baseURL: "https://marlonrodler.github.io/leagueoflegends-champions-json/champions.json",
});

export default api;
