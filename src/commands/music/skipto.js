const {canModifyQueue} = require("../../util/queueModify");
const embedMessage = require("../../util/embedContent");

module.exports = {
    name: "skipto",
    aliases: ["st"],
    async execute(message, args) {
        try {
            if (!(await canModifyQueue(message))) return;
            if (!args.length) return message.reply({embeds: [embedMessage("Enter the correct position to skip to in the queue.\nUsage: `skipto <queue position>`")]});
            if (isNaN(args[0])) return message.reply({embeds: [embedMessage("Enter the correct position to skip to in the queue.\nUsage: `skipto <queue position>`")]});

            const player = message.client.manager.get(message.guild.id);
            if (args[0] > player.queue.length) return message.reply({embeds: [embedMessage(`${message.author} The queue is only ${player.queue.length} track(s) long!`)]});

            player.queue = player.queue.slice(args[0] - 1);
            await player.stop();

            return message.reply({embeds: [embedMessage(`${message.author} Skipped **${args[0] - 1}** track(s).`)]});
        } catch (err) {
            return message.reply({embeds: [embedMessage("Make sure you type the correct number to skip to in the correct format.\nUsage: `skipto <queue position>`")]});
        }
    },
};
