const { canModifyQueue } = require("../../util/queueModify");
const embedMessage = require("../../util/embedContent");

module.exports = {
    name: "jump",
    async execute(message, args) {
        if (!(await canModifyQueue(message))) return;
        if (message.options.get("position").value < 1) return message.reply({ embeds: [embedMessage(`Please enter a valid position from the queue.`)], ephemeral: true });

        const player = message.client.manager.queue.get(message.guild.id);
        if (message.options.get("position").value > player.length) return message.reply({ embeds: [embedMessage(`${message.member.user} The queue contains only **${player.queue.length}** tracks`)], ephemeral: true });

        const songNum = message.options.get("position").value - 1;

        let popped = player.queue.splice(songNum, 1);
        await player.queue.unshift(...popped);

        await player.skip();
        return message.reply({ embeds: [embedMessage(`${message.member.user} Jumped to track **${message.options.get("position").value}**`)] });
    },
};
