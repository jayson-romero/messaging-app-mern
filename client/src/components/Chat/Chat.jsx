import "./Chat.css"
import { Avatar, IconButton } from "@mui/material"

import AttachFileIcon from "@mui/icons-material/AttachFile"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import MicIcon from "@mui/icons-material/Mic"
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon"
import { useEffect, useState } from "react"

const Chat = () => {
	const [seed, setSeed] = useState("")
	useEffect(() => {
		setSeed(Math.floor(Math.random() * 5000))
	}, [])

	return (
		<div className="chat">
			{/* HEADER  */}
			<div className="chat__header">
				<Avatar src={`https://avatars.dicebear.com/api/human/b${seed}.svg`} />
				<div className="chat__headerInfo">
					<h3>Room Name</h3>
					<p>Last seen at...</p>
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
				<p className="chat__message">
					<span className="chat__name">Nabendu</span>
					This is a message
					<span className="chat__timestamp">{new Date().toUTCString()}</span>
				</p>
				<p className="chat__message chat__receiver">
					<span className="chat__name">Parag</span>
					This is a message back
					<span className="chat__timestamp">{new Date().toUTCString()}</span>
				</p>
				<p className="chat__message">
					<span className="chat__name">Nabendu</span>
					This is a message again again
					<span className="chat__timestamp">{new Date().toUTCString()}</span>
				</p>
			</div>

			{/* FOOTER  */}
			<div className="chat__footer">
				<InsertEmoticonIcon />
				<form>
					<input placeholder="Type a message" type="text" />
					<button type="submit">Send a message</button>
				</form>
				<MicIcon />
			</div>
		</div>
	)
}

export default Chat
