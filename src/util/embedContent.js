const { EmbedBuilder } = require("discord.js");
module.exports = (content) => {
  if (!content) return new EmbedBuilder().setColor("#FF0000");
  else if (content) return new EmbedBuilder().setColor("#FF0000").setDescription(content);
};
