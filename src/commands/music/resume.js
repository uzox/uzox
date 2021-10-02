const {canModifyQueue} = require("../../util/queueModify");
const embedMessage = require("../../util/embedContent");

module.exports = {
    name: "resume",
    aliases: ["r"],
    async execute(message) {
        if (!(await canModifyQueue(message))) return;

        const player = message.client.manager.get(message.guild.id);
        if (!player.paused) return message.reply({embeds: [embedMessage("The track is already playing.")]});

        await player.pause(false);
        return message.reply({embeds: [embedMessage(`${message.author} Resumed the music.`)]});
    },
};
