const embedMessage = require("../../util/embedContent");

module.exports = {
    name: "queue",
    execute(message) {
        const player = message.client.manager.queue.get(message.guild.id);
        if (!player) return message.reply({ embeds: [embedMessage("There is no queue for this server.")] });

        const queue = player.queue;
        const embed = embedMessage().setAuthor({ name: `${message.guild.name}'s Queue` })
        const multiple = 10;
        const page = message.options.get("page")?.value ? message.options.get("page").value : 1;
        const end = page * multiple;
        const start = end - multiple;
        const tracks = queue.slice(start, end);
        if (player.current)
            embed.addFields({
                name: "Now Playing: ", value: `\`${player.current.info.isStream ? "🔴 LIVE" : new Date(player.current.info.length)
                    .toISOString().substr(11, 8)}\` [\`${player.current.info.title.replace("[", "").replace("]", "").replace("(", "").replace(")", "")}\`](${player.current.info.uri})\n\`-\` ${player.current.info.requester}\n`
            });

        if (!tracks.length)
            embed.setDescription(`No tracks in ${page > 1 ? `page ${page}` : "the queue"}.`);
        else
            embed.setDescription(tracks.map((track, i) => `\`${start + ++i}\` \`-\` \`${track.info.isStream ? "🔴 LIVE" : new Date(track.info.length)
                .toISOString().substr(11, 8)}\` [\`${(track.info.title.substring(0, 40)).replace("[", "").replace("]", "").replace("(", "").replace(")", "")}...\`](${track.info.uri})\n\`-\` ${track.info.requester}`).join("\n"));

        const maxPages = Math.ceil(queue.length / multiple);
        embed.setFooter({ text: `Page ${page > maxPages ? maxPages : page} of ${maxPages}` });

        return message.reply({ embeds: [embed] });
    },
};
