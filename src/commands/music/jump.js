const { canModifyQueue } = require("../../util/queueModify");
const embedMessage = require("../../util/embedContent");

module.exports = {
    name: "jump",
    async execute(message, args) {
        if (!(await canModifyQueue(message))) return;
        if (!args.length) return message.reply({ embeds: [embedMessage(`Usage: jump <queue number>`)] });
        if (isNaN(args[0])) return message.reply({ embeds: [embedMessage(`Usage: jump <queue number>`)] });

        const player = message.client.manager.get(message.guild.id);
        if (args[0] > player.queue.length) return message.reply({ embeds: [embedMessage(`${message.member.user} The queue is only ${player.queue.length} songs long!`)] });

        await message.client.commands.get("move").execute(message, [args[0], 1], "no");
        return player.stop();
    },
};
