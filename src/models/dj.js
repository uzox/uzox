const mongoose = require("mongoose");

const PrefixSchema = new mongoose.Schema({
    GuildID: String,
    DJ: String
});

const MessageModel = (module.exports = mongoose.model(
    "djs",
    PrefixSchema
));
