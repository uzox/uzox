const {canModifyQueue} = require("../../util/queueModify");
const embedMessage = require("../../util/embedContent");

module.exports = {
    name: "previous",
    aliases: ["prev"],
    async execute(message) {
        if (!(await canModifyQueue(message))) return;

        const player = message.client.manager.get(message.guild.id);
        if (!player.queue.previous) return message.reply({embeds: [embedMessage("There wasn't a track before this.")]});

        const song = player.queue.previous.title;
        await message.client.commands.get("playnext").execute(message, song.split(" "));

        await player.stop();
        return message.reply({embeds: [embedMessage(`${message.member.user} Playing the previous track.`)]});
    },
};
