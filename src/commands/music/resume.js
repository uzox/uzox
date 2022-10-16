const { canModifyQueue } = require("../../util/queueModify");
const { isDJ } = require("../../util/isDJ");
const embedMessage = require("../../util/embedContent");

module.exports = {
    name: "resume",
    async execute(message) {
        if (!(await canModifyQueue(message)) || !(await isDJ(message))) return;

        const player = message.client.manager.queue.get(message.guild.id);
        if (!player?.player?.paused) return message.reply({ embeds: [embedMessage("The track is already playing.")], ephemeral: true });

        await player.resume();
        return message.reply({ embeds: [embedMessage(`${message.member.user} **Resumed** the track.`)] });
    },
};
