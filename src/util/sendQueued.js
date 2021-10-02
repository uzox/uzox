const embedMessage = require("../util/embedContent");

module.exports = async (song, message) => {
    try {
        let messembed;
        messembed = embedMessage()
            .addField(
                "Track: ",
                `[${song.title.substring(0, 100)}](${song.uri})`,
                true
            )
            .addField("Requested By: ", `${song.requester}`, true)
            .addField(
                "Duration: ",
                `\`${new Date(Math.floor(song.duration)).toISOString().substr(11, 8)}\``,
                true
            )
            .setTitle("Track Queued");

        return message.channel
            .send({ embeds: [messembed] })
            .catch(() => { });
    } catch (err) {
        console.log(err);
    }
}