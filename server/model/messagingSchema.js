import mongoose from "mongoose"

const messagingSchema = mongoose.Schema({
	message: String,
	name: String,
	timestamp: String,
	received: Boolean,
})

const Messages = mongoose.model("messagingmessages", messagingSchema)
export default Messages
