const embedMessage = require("../../util/embedContent");
const { canModifyQueue } = require("../../util/queueModify");

module.exports = {
    name: "pause",
    async execute(message) {
        if (!(await canModifyQueue(message))) return;

        const player = message.client.manager.queue.get(message.guild.id);
        if (player?.player?.paused) return message.reply({ embeds: [embedMessage("The track is already paused.")], ephemeral: true });

        await player.pause();
        return message.reply({ embeds: [embedMessage(`${message.member.user} **Paused** the track.`)] });
    },
};
