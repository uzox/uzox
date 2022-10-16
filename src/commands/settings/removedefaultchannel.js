const embedMessage = require("../../util/embedContent");
const defaultchannel = require("../../models/defaultchannel");
const { PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: "removedefaultchannel",
    async execute(message) {
        if (!message.member.permissions.has(PermissionFlagsBits.ManageGuild))
            return message.reply({ embeds: [embedMessage("You don't have the permissions to do that!")], ephemeral: true });

        if ((await defaultchannel.findOne({ GuildID: message.guild.id }))?.ChannelID) {
            (await defaultchannel.findOneAndDelete({ GuildID: message.guild.id }))
            return message.reply({ embeds: [embedMessage(`Removed the default channel configuration`)] })
        }
        return message.reply({ embeds: [embedMessage(`A default text channel isn't set`)] })
    },
};
