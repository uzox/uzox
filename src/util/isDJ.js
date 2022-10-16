const DJ = require("../models/dj");
const embedContent = require("./embedContent");
const { PermissionFlagsBits } = require("discord.js");

module.exports = {
  async isDJ(message) {
    try {
      const ppl = Number(message.guild.me.voice.channel.members.size);
      if (message.member.permissions.has(PermissionFlagsBits.ManageMessages) || ppl == 2)
        return true;

      const data = await DJ.findOne({ GuildID: message.guild.id });
      if (!data?.DJ) return true;
      if ((await message.member.roles.cache.find((r) => r.id === data.DJ))) return true;

      message.reply({ embeds: [embedContent("You're neither a DJ nor a user with `Manage Messages` permission.")], ephemeral: true });
      return false;
    } catch (err) { }
    return true;
  },
};
