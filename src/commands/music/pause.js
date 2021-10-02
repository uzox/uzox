const embedMessage = require("../../util/embedContent");
const {canModifyQueue} = require("../../util/queueModify");

module.exports = {
    name: "pause",
    aliases: ["ps"],
    async execute(message) {
        if (!(await canModifyQueue(message))) return;

        const player = message.client.manager.get(message.guild.id);
        if (player.paused) return message.reply({embeds: [embedMessage("The track is already paused.")]});

        await player.pause(true);
        return message.reply({embeds: [embedMessage(`${message.member.user} Paused the track.`)]});
    },
};
