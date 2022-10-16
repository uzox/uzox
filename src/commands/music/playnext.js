const embedMessage = require("../../util/embedContent");
const { canModifyQueue } = require("../../util/queueModify");
const playSong = require("./play").execute;

module.exports = {
    name: "playnext",
    async execute(message, optionalQuery, e) {
        if (!e) if (!await canModifyQueue(message, "PLAY", undefined, true)) return;

        let query = optionalQuery ? optionalQuery : message.options.get("query").value;
        if (!e) await playSong(message, query);
        else await playSong(message, query);

        const player = message.client.manager.queue.get(message.guild.id);
        if (!player?.queue) return;

        await player.queue.unshift(await player.queue.splice(player.queue.length - 1, 1)[0])
        if (!e) return await message.channel.send({ embeds: [embedMessage(`${message.member.user} Queued a track to play next.`)] });
    },
};
