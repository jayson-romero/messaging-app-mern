// CSS
import "./Sidebar.css"
// MUI ICONS
import DonutLargeIcon from "@mui/icons-material/DonutLarge"
import ChatIcon from "@mui/icons-material/Chat"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
// MUI Components
import { Avatar, IconButton } from "@mui/material"

// COMPONENT
import SidebarChat from "../SidebarChat/SidebarChat"

import { useStateValue } from "../Login/Context/StateProvider"

const Sidebar = ({ messages }) => {
	const [{ user }, dispatch] = useStateValue()
	return (
		<div className="sidebar">
			{/* PROFILE SECTION  */}
			<div className="sidebar__header">
				<Avatar src={user?.photoURL} />
				<div className="siderbar__header_info">
					<h2>{user?.displayName} </h2>
					<p>{user?.email} </p>
				</div>
				<div className="sidebar__headerRight">
					<IconButton>
						<DonutLargeIcon />
					</IconButton>
					<IconButton>
						<ChatIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</div>
			</div>

			{/* SEARCH  */}
			<div className="sidebar__search">
				<div className="sidebar__searchContainer">
					<SearchOutlinedIcon />
					<input placeholder="Search or start new chat" type="text" />
				</div>
			</div>

			<div className="sidebar__chats">
				<SidebarChat messages={messages} />
			</div>
		</div>
	)
}

export default Sidebar
