const mongoose = require("mongoose");

const PrefixSchema = new mongoose.Schema({
  Prefix: {
    type: String,
  },
  GuildID: String,
  dj: Object,
  playlistlimit: Number,
  SpecialChannel: String,
  Disabled: Array
});

const MessageModel = (module.exports = mongoose.model(
  "prefixes",
  PrefixSchema
));
