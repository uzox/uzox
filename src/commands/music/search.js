const embedMessage = require("../../util/embedContent");

module.exports = {
    name: "search",
    description: "Search and select videos to play",
    aliases: ["srch"],
    async execute(message, args) {
        if (!args.length) return message.reply({ embeds: [embedMessage(`Enter the name of the track you want to search for on Youtube.\nUsage: \`search <name>\``)] });
        if (!message.member.voice.channel) return message.reply({ embeds: [embedMessage("You need to join a voice channel first!")] });

        const search = args.join(" ");
        let resultsEmbed = embedMessage(`Results for: ${search}`).setTitle(`Choose a song you want to play`)

        try {
            const results = client.manager.search(search, message.author);
            results.map((video, index) => resultsEmbed.addField(video.url, `${index + 1}. ${video.title}`));
            const resultsMessage = await message.channel.send({ embeds: [resultsEmbed] });

            function filter(msg) {
                const pattern = /(^[1-9][0-9]?$)/g;
                return (
                    pattern.test(msg.content) &&
                    parseInt(msg.content.match(pattern)[0]) <= 10
                );
            }

            message.channel.activeCollector = true;
            const response = await message.channel.awaitMessages({
                filter: filter,
                max: 1,
                time: 20000,
                errors: ["time"],
            });
            const choice = resultsEmbed.fields[parseInt(response.first()) - 1].name;

            await message.client.commands.get("play").execute(message, [choice]);
            resultsMessage.delete().catch((err) => { });
        } catch (error) { }
    },
};
