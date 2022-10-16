const { canModifyQueue } = require("../../util/queueModify");
const embedMessage = require("../../util/embedContent");

module.exports = {
    name: "skipto",
    async execute(message) {
        try {
            if (!await canModifyQueue(message)) return;

            const player = message.client.manager.queue.get(message.guild.id);
            if (message.options.get("position").value > player.queue.length) return message.reply({ embeds: [embedMessage(`${message.author} The queue contains only **${player.queue.length}** track(s)`)], ephemeral: true });

            player.queue = player.queue.slice(message.options.get("position").value - 1);
            await player.skip();

            return message.reply({ embeds: [embedMessage(`${message.author} Skipped **${message.options.get("position").value - 1}** track(s).`)] });
        } catch (err) {
            return message.reply({ embeds: [embedMessage("Make sure you've entered the correct position number to skip to in the queue")], ephemeral: true });
        }
    },
};
