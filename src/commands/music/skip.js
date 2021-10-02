const { canModifyQueue } = require("../../util/queueModify");
const embedMessage = require("../../util/embedContent");

module.exports = {
    name: "skip",
    aliases: ["s"],
    description: "Skip the currently playing song",
    async execute(message) {
        const player = message.client.manager.get(message.guild.id);
        if (!player) return message.reply({ embeds: [embedMessage("There is nothing playing here.")] });
        if (!(await canModifyQueue(message))) return;

        await player.stop();
        return message.reply({ embeds: [embedMessage(`${message.author} Skipped the song`)] });
    },
};
