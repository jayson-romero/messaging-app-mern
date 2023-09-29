import "./App.css"

import { useState, useEffect } from "react"
import Pusher from "pusher-js"
import axios from "axios"

import Sidebar from "./components/Sidebar/Sidebar"
import Chat from "./components/Chat/Chat"

function App() {
	const [messages, setMessages] = useState([])

	useEffect(() => {
		axios.get("http://localhost:9000/messages/sync").then((res) => {
			setMessages(res.data)
		})
	}, [])

	useEffect(() => {
		const pusher = new Pusher("69d9d7ed8ab99fbcc7d6", {
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

	console.log(messages)
	return (
		<div className="app">
			<div className="app__body">
				<Sidebar />
				<Chat messages={messages} />
			</div>
		</div>
	)
}

export default App
