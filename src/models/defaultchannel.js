const mongoose = require("mongoose");
const {NAME} = require("../../config/config.json");

const PrefixSchema = new mongoose.Schema({
    GuildID: String,
    ChannelID: String
});

const MessageModel = (module.exports = mongoose.model(`${NAME}-defaultchannel`, PrefixSchema));
