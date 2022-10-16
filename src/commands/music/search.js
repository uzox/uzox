const embedMessage = require("../../util/embedContent");
const { canModifyQueue } = require("../../util/queueModify");
const createSearchList = require("../../util/createSearchList");

async function getRes(t, node) {
    try {
        new URL(t)
        res = await node.rest.resolve(t);
        if (!res) {
            for (let i = 0; i < 5; i++) {
                res = await node.rest.resolve(t);
                if (res) break;
            }
        }
        return res;
    } catch (err) {
        res = await node.rest.resolve(t, 'youtube');
        if (!res) {
            for (let i = 0; i < 5; i++) {
                res = await node.rest.resolve(t, 'youtube');
                if (res) break;
            }
        }
        return res;
    }
}

module.exports = {
    name: "search",
    async execute(message) {
        if (!await canModifyQueue(message, "PLAY", undefined, true)) return;

        const search = message.options.get("query").value;
        let resultsEmbed = embedMessage(`Results for: ${search}`).setTitle(`Pick a track you want to queue`)

        await message.deferReply({ ephemeral: true });
        message.reply = message.followUp;
        let results = await getRes(search, await message.client.manager.getNode());
        if (results?.tracks?.length) {
            results = results.tracks.splice(0, 10);
            let description = "";

            results.map((track, i) => description += `\`${i + 1}\` \`-\` \`${track.info.isStream ? "🔴 LIVE" : new Date(track.info.length)
                .toISOString().substr(11, 8)}\` [\`${(track.info.title.substring(0, 40)).replace("[", "").replace("]", "").replace("(", "").replace(")", "")}...\`](${track.info.uri})\n\n`)

            resultsEmbed.setDescription(description)
            return await message.reply({ embeds: [resultsEmbed], components: [await createSearchList(results, message.author.id)], ephemeral: true });
        }
        else {
            return message.reply({ embeds: [embedMessage(`No Results Found For: ${search}`)], ephemeral: true })
        }
    },
};
