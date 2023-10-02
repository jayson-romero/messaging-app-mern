import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { StateProvider } from "./components/Login/Context/StateProvider"
import reducer, { initialState } from "./components/Login/Context/reducer.js"

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<StateProvider initialState={initialState} reducer={reducer}>
			<App />
		</StateProvider>
	</React.StrictMode>
)
