const { canModifyQueue } = require("../../util/queueModify");
const embedMessage = require("../../util/embedContent");

module.exports = {
    name: "stop",
    aliases: ["dc", "clear", "leave"],
    async execute(message) {
        if (!(await canModifyQueue(message))) return;

        const player = message.client.manager.get(message.guild.id);
        if (!player) return message.reply({ embeds: [embedMessage("There is nothing playing here.")] });
        if (player.queue.playingmessage) await player.queue.playingmessage.delete().catch(err => { });

        await player.destroy();
        return message.reply({ embeds: [embedMessage(`${message.author} disconnected me from the voice channel.`)] });
    },
};
