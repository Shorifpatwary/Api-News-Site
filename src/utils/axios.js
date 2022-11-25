import axios from "axios";

const instance = axios.create({
	baseURL: process.env.REACT_APP_NEWS_URL,
	// baseURL: "https://newsapi.org/v2/top-headlines",
});
instance.defaults.headers.common["X-Api-key"] =
	process.env.REACT_APP_NEWS_API_KEY;
// "f1c827ccce0c4b7e9275f27ee92c202a";

export default instance;
