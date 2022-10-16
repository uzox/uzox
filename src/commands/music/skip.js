const { canModifyQueue } = require("../../util/queueModify");
const embedMessage = require("../../util/embedContent");

module.exports = {
    name: "skip",
    async execute(message) {
        if (!(await canModifyQueue(message))) return;
        
        const player = message.client.manager.queue.get(message.guild.id);
        await player.skip();
        return message.reply({ embeds: [embedMessage(`${message.author} **Skipped** the track`)] });
    },
};
