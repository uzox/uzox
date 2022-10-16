const { canModifyQueue } = require("../../util/queueModify");
const embedMessage = require("../../util/embedContent");

module.exports = {
    name: "stop",
    async execute(message) {
        if (!(await canModifyQueue(message))) return;

        const player = message.client.manager.queue.get(message.guild.id);
        try { if (player.queue.playingmessage) await player.queue.playingmessage.delete(); } catch (err) { }
        await player.destroy();
        return message.reply({ embeds: [embedMessage(`${message.member.user} **Stopped** the player and **cleared** the queue.\n**If this was a mistake** please run the **\`revivequeue\`** command to re-queue the tracks before the disconnection.`)] });
    },
};
