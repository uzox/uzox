const {canModifyQueue} = require("../../util/queueModify");
const embedMessage = require("../../util/embedContent");

module.exports = {
    name: "volume",
    aliases: ["v", "vol"],
    async execute(message, args) {
        if (!(await canModifyQueue(message))) return;

        const player = message.client.manager.get(message.guild.id);
        if (!args.length) return message.reply({embeds: [embedMessage(`${message.member.user} The player volume is at \`${player.volume}%\`.`)]});

        const volume = Number(args[0]);
        if (!volume || volume < 1 || volume > 100) return message.reply({embeds: [embedMessage(`Please enter a number between 1 and 100 to set the volume.\nUsage: \`volume <1-100>\``)]});

        await player.setVolume(volume);
        return message.reply({embeds: [embedMessage(`${message.member.user} Set the player volume to \`${volume}\`.`)]});
    },
};
