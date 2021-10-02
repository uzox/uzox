const embedMessage = require("../../util/embedContent");
const prefixModel = require("../../models/prefix");

module.exports = {
  name: "setprefix",
  cooldown: 5,
  async execute(message, args) {
    if (!message.member.permissions.has("MANAGE_GUILD"))
      return message.reply({ embeds: [embedMessage("You don't have the permission to do that!")] });

    if (!args[0] || args[0] === "help")
      return message.reply({ embeds: [embedMessage(`Enter a prefix to change to.\nUsage: \`setprefix <new prefix>\``)] });

    try {
      const data = await prefixModel.findOne({
        GuildID: message.guild.id,
      });

      if (args[0].length > 10) args[0] = args[0].slice(0, 9);

      if (data) {
        await prefixModel.findOneAndRemove({
          GuildID: message.guild.id,
        });
        let newData = prefixModel({
          Prefix: args[0],
          GuildID: message.guild.id,
          Disabled: data.Disabled,
        });
        await newData.save();
      } else if (!data) {
        let newData = prefixModel({
          Prefix: args[0],
          GuildID: message.guild.id,
        });
        await newData.save();
      }

      message.reply({ embeds: [embedMessage(`${message.author} The server's prefix has been changed to ${args[0].slice(0, 9)}`)] });
    } catch (err) { }
  },
};
