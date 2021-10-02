const embedMessage = require("../../util/embedContent");
const {canModifyQueue} = require("../../util/queueModify");

module.exports = {
    name: "remove",
    description: "Remove song from the queue",
    aliases: ["rm"],
    async execute(message, args) {
        try {
            if (!(await canModifyQueue(message))) return;
            if (!args.length) return message.reply({embeds: [embedMessage(`Please enter a valid position of the track you want to remove from the queue.\nUsage: \`remove <position>\``)]});
            if (isNaN(args[0])) return message.reply({embeds: [embedMessage(`Please enter a valid position of the track you want to remove from the queue.\nUsage: \`remove <position>\``)]});

            const player = message.client.manager.get(message.guild.id);
            const song = player.queue.splice(args[0] - 1, 1);

            return message.reply({embeds: [embedMessage(`${message.member.user} Removed **${song[0].title}** from the queue.`)]});
        } catch (err) {
            return message.reply({embeds: [embedMessage(`${message.member.user} Please enter a valid position of the track you want to remove from the queue.\nUsage: \`remove <position>\``)]});
        }
    },
};
