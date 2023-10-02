import "./SidebarChat.css"
// REACT HOOKS
import { useEffect, useState } from "react"
// MUI Components
import { Avatar } from "@mui/material"

const SidebarChat = ({ messages }) => {
	const [seed, setSeed] = useState("")

	useEffect(() => {
		setSeed(Math.floor(Math.random() * 5000))
	}, [])

	return (
		<div className="sidebarChat">
			<Avatar src={`https://api.dicebear.com/7.x/open-peeps/svg?seed=Bear`} />
			<div className="sidebarChat__info">
				<h2>Dev Help</h2>
				<p>{messages[messages.length - 1]?.message}</p>
			</div>
		</div>
	)
}

export default SidebarChat
