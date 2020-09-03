const {Schema} = require("mongoose")
const mongoose = require("mongoose")

const MessageSchema = new Schema({
    sender: String,
    text: String,
    room: {type: String, $ref: "Rooms"}
})
const MessageModel = mongoose.model("message", MessageSchema)

module.exports = MessageModel