import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {BrowserRouter} from 'react-router-dom'
import UserAuthContext from "./context/UserAuthContext";
// import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
		<UserAuthContext>
			<App />
		</UserAuthContext>
		</BrowserRouter>
	</React.StrictMode>
);
