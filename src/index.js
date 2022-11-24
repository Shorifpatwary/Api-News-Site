import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/app";
import "./app/app.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
if (process.env.NODE_ENV !== "development") {
	root.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	);
} else {
	root.render(<App />);
}
// console.log(process.env.REACT_APP_NEWS_URL, process.env.REACT_APP_NEWS_API_KEY);

reportWebVitals();
