import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import Pusher from "pusher"
import mongoose from "mongoose"

import ConnectDB from "./config/db.js"
import Messages from "./model/messagingSchema.js"

//App Config
dotenv.config()
const port = process.env.PORT || 9000
const app = express()
const pusher = new Pusher({
	appId: process.env.PUSHER_APPID,
	key: process.env.PUSHER_KEY,
	secret: process.env.PUSHER_SECRET,
	cluster: "ap1",
	useTLS: true,
})

//DB config
ConnectDB()
//Middleware
app.use(express.json())
app.use(cors())

//API Endpoints
const db = mongoose.connection
db.once("open", () => {
	console.log("DB Connected")
	const msgCollection = db.collection("messagingmessages")
	const changeStream = msgCollection.watch()
	changeStream.on("change", (change) => {
		console.log(change)
		if (change.operationType === "insert") {
			const messageDetails = change.fullDocument
			pusher.trigger("messages", "inserted", {
				name: messageDetails.name,
				message: messageDetails.message,
				timestamp: messageDetails.timestamp,
				received: messageDetails.received,
			})
		} else {
			console.log("Error trigerring Pusher")
		}
	})
})

app.get("/", (req, res) => {
	res.status(200).send("Welcome API")
})

app.post("/messages/new", async (req, res) => {
	const dbMessage = req.body
	try {
		const response = await Messages.create(dbMessage)
		res.status(201).send(response)
	} catch (error) {
		res.status(500).send(error)
	}
})

app.get("/messages/sync", async (req, res) => {
	try {
		const response = await Messages.find()
		res.status(200).send(response)
	} catch (error) {
		res.status(500).send(error)
	}
})

//Listening
app.listen(port, () => console.log(`listening on ${port}`))
