const embedMessage = require("../../util/embedContent");
const defaultchannel = require("../../models/defaultchannel");
const { PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: "setdefaultchannel",
    async execute(message) {
        if (!message.member.permissions.has(PermissionFlagsBits.ManageGuild))
            return message.reply({ embeds: [embedMessage("You don't have the permissions to do that!")], ephemeral: true });

        if ((await defaultchannel.findOne({ GuildID: message.guild.id }))?.ChannelID)
            (await defaultchannel.findOneAndDelete({ GuildID: message.guild.id }))

        let newdata = defaultchannel({ GuildID: message.guild.id, ChannelID: message.options.get("channel").value })
        await newdata.save();

        return message.reply({ embeds: [embedMessage(`Set the default text channel to <#${message.options.get("channel").value}>`)] })
    },
};
