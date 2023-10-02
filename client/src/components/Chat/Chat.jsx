import "./Chat.css"
import { Avatar, IconButton } from "@mui/material"

import AttachFileIcon from "@mui/icons-material/AttachFile"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import MicIcon from "@mui/icons-material/Mic"
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon"
import { useEffect, useState } from "react"
import axios from "axios"

import { useStateValue } from "../Login/Context/StateProvider"

const Chat = ({ messages }) => {
	const [seed, setSeed] = useState("")
	const [input, setInput] = useState("")
	const [{ user }, dispatch] = useStateValue()

	const sendMessage = async (e) => {
		e.preventDefault()
		await axios.post(
			"https://messaging-app-server-wow9.onrender.com/messages/new",
			{
				message: input,
				name: user.displayName,
				timestamp: new Date().toUTCString(),
				received: true,
			}
		)
		setInput("")
	}

	useEffect(() => {
		setSeed(Math.floor(Math.random() * 5000))
	}, [])

	return (
		<div className="chat">
			{/* HEADER  */}
			<div className="chat__header">
				<Avatar src={`https://api.dicebear.com/7.x/open-peeps/svg?seed=Bear`} />
				<div className="chat__headerInfo">
					<h3>Dev Help</h3>
					<p>Last seen at {messages[messages.length - 1]?.timestamp}</p>
				</div>
				<div className="chat__headerRight">
					<IconButton>
						<SearchOutlinedIcon />
					</IconButton>
					<IconButton>
						<AttachFileIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</div>
			</div>

			{/* BODY */}
			<div className="chat__body">
				{messages.map((message) => (
					<p
						key={message._id}
						className={`chat__message ${
							message.name === user.displayName && "chat__receiver"
						}`}
					>
						<span className="chat__name">{message.name}</span>
						{message.message}
						<span className="chat__timestamp">{message.timestamp}</span>
					</p>
				))}
			</div>

			{/* FOOTER  */}
			<div className="chat__footer">
				<InsertEmoticonIcon />
				<form>
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Type a message"
						type="text"
					/>
					<button onClick={sendMessage} type="submit">
						Send a message
					</button>
				</form>
				<MicIcon />
			</div>
		</div>
	)
}

export default Chat
