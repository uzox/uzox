const { MessageEmbed } = require("discord.js");
module.exports = (content) => {
  if (!content) return new MessageEmbed().setColor("#FF0000");
  else if (content) return new MessageEmbed().setColor("#FF0000").setDescription(content);
};
