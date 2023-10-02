import "./App.css"

import { useState, useEffect } from "react"
import Pusher from "pusher-js"
import axios from "axios"
// import dotenv from "dotenv"
// dotenv.config()

import { useStateValue } from "./components/Login/Context/StateProvider"

import Sidebar from "./components/Sidebar/Sidebar"
import Chat from "./components/Chat/Chat"
import Login from "./components/Login/Login"

function App() {
	const [messages, setMessages] = useState([])
	const [{ user }, dispatch] = useStateValue()

	useEffect(() => {
		axios.get("http://localhost:9000/messages/sync").then((res) => {
			setMessages(res.data)
		})
	}, [])

	useEffect(() => {
		const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
			cluster: "ap1",
		})
		const channel = pusher.subscribe("messages")
		channel.bind("inserted", (data) => {
			setMessages([...messages, data])
		})
		return () => {
			channel.unbind_all()
			channel.unsubscribe()
		}
	}, [messages])

	return (
		<div className="app">
			{!user ? (
				<Login />
			) : (
				<div className="app__body">
					<Sidebar messages={messages} />
					<Chat messages={messages} />
				</div>
			)}
		</div>
	)
}

export default App
