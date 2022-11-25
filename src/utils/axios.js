import axios from "axios";

const instance = axios.create({
	// baseURL: process.env.REACT_APP_NEWS_URL, // not working on netlify
	baseURL: "https://newsapi.org/v2/top-headlines",
});
instance.defaults.headers.common["X-Api-key"] =
	"f1c827ccce0c4b7e9275f27ee92c202a";
// process.env.REACT_APP_NEWS_API_KEY;  // not working on netlify

export default instance;
