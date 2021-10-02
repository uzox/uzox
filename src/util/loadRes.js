const sendQueued = require("./sendQueued");
const embedMessage = require("../util/embedContent")

module.exports = async (res, player, message) => {
    switch (res.loadType) {
        case "NO_MATCHES":
            if (!player.queue.current) player.destroy();

            return message.channel.send({ embeds: [embedMessage("Couldn't find a matching track.")] });
            break;

        case "TRACK_LOADED":
            player.queue.add(res.tracks[0]);
            if (!player.playing && !player.paused && !player.queue.size) await player.play();

            return sendQueued(res.tracks[0], message).then((msg) => msg.delete({ timeout: 3000 }));
            break;

        case "PLAYLIST_LOADED":
            player.queue.add(res.tracks);
            if (!player.playing && !player.paused && player.queue.totalSize === tracks.length) player.play();
            if (!res.playlist) return;

            return message.channel.send({ embeds: [embedMessage(`Added a playlist **${res.playlist.name}** with ${res.tracks.length} tracks`)] });
            break;

        case "SEARCH_RESULT":
            player.queue.add(res.tracks[0]);
            if (!player.playing && !player.paused) player.play();

            return sendQueued(res.tracks[0], message);
            break;
    }
}