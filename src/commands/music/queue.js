const embedMessage = require("../../util/embedContent");

module.exports = {
    name: "queue",
    aliases: ["q"],
    cooldown: 3,
    execute(message, args) {
        try {
            const player = message.client.manager.get(message.guild.id);
            if (!player) return message.reply({ embeds: [embedMessage("There is no queue for this server.")] });

            const queue = player.queue;
            const embed = embedMessage()
                .setAuthor(`${message.guild.name}'s Queue`)
                .setColor("#FF0000");
            const multiple = 10;
            const page = args.length && Number(args[0]) ? Number(args[0]) : 1;
            const end = page * multiple;
            const start = end - multiple;
            const tracks = queue.slice(start, end);
            if (queue.current)
                embed.addField(
                    "Now Playing: ",
                    `\`${new Date(queue.current.duration).toISOString().substr(11, 8)}\` [\`${queue.current.title.substring(0, 150).split("[").join("").split("]").join("").split("(").join("").split(")").join("")}\`](${queue.current.uri})\n\`-\` ${queue.current.requester}\n`
                );

            if (!tracks.length)
                embed.setDescription(`No tracks in ${page > 1 ? `page ${page}` : "the queue"}.`);
            else
                embed.setDescription(
                    tracks
                        .map((track, i) => `\`${start + ++i}\` \`-\` \`${new Date(track.duration).toISOString().substr(11, 8)}\` [\`${track.title.substring(0, 45).split("[").join("").split("]").join("").split("(").join("").split(")").join("")}...\`](${track.uri})\n\`-\` ${track.requester}`)
                        .join("\n")
                );

            const maxPages = Math.ceil(queue.length / multiple);
            embed.setFooter(`Page ${page > maxPages ? maxPages : page} of ${maxPages}`);

            return message.reply({ embeds: [embed] });
        } catch (err) {
            return message.reply({ embeds: [embedMessage("There was an error displaying the queue. If the problem persists contact the developers.")] });
        }
    },
};
