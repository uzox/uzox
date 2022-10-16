const { canModifyQueue } = require("../../util/queueModify");
const play = require("./playnext").execute;
const embedMessage = require("../../util/embedContent");

module.exports = {
    name: "previous",
    async execute(message) {
        if (!(await canModifyQueue(message))) return;

        const player = message.client.manager.queue.get(message.guild.id);
        if (!player?.previous?.info?.uri) return message.reply({ embeds: [embedMessage("There is no previous track.")], ephemeral: true });

        await play(message, player.previous.info.uri, "KG");
        if (player.queue.size === 0) return message.reply({ embeds: [embedMessage(`${message.member.user} Playing the previous track.`)] });

        await player.skip();
        return message.reply({ embeds: [embedMessage(`${message.member.user} Playing the previous track.`)] });
    },
};
