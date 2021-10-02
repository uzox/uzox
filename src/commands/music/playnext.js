const embedMessage = require("../../util/embedContent");
const { canModifyQueue } = require("../../util/queueModify");

module.exports = {
    name: "playnext",
    cooldown: 3,
    aliases: ["pn"],
    async execute(message, args) {
        try {
            if (!await canModifyQueue(message, "PLAY", true)) return;
            const player = message.client.manager.get(message.guild.id);
            if (!args[0]) return message.reply({ embeds: [embedMessage("Enter the name of a track you want to play.\nUsage: `playnext <name>`")] });

            await message.client.commands.get("play").execute(message, args);
            if (player.queue.size === 0) return;

            const place = player.queue.size;
            await message.client.commands.get("move").execute(message, [place, "1"], "no");
            return message.reply({ embeds: [embedMessage(`${message.member.user} This song will play next unless it's a playlist.`)] });
        } catch (err) {
        }
    },
};
