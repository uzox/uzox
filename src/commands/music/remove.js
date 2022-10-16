const embedMessage = require("../../util/embedContent");
const { canModifyQueue } = require("../../util/queueModify");
const { isDJ } = require("../../util/isDJ");

module.exports = {
    name: "remove",
    async execute(message) {
        try {
            if (!(await canModifyQueue(message))) return;

            const player = message.client.manager.queue.get(message.guild.id);
            const song = player.queue.splice(message.options.get("position").value - 1, 1);

            return message.reply({ embeds: [embedMessage(`${message.member.user} Removed **${song[0].info.title}** from the queue.`)] });
        } catch (err) {
            return message.reply({ embeds: [embedMessage(`${message.member.user} Please enter a valid position of the track you want to remove from the queue.`)], ephemeral: true });
        }
    },
};
