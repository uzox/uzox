const {canModifyQueue} = require("../../util/queueModify");
const embedMessage = require("../../util/embedContent");

module.exports = {
    name: "forward",
    aliases: ["fwd", "ff"],
    async execute(message, args) {
        try {
            if (!(await canModifyQueue(message))) return;

            const player = message.client.manager.get(message.guild.id);
            if (player.queue.current.isStream) return message.reply({embeds: [embedMessage("I can't seek live streams.")]});

            const songtime = player.queue.current.duration / 1000;
            let seektime = player.position / 1000 + Number(args[0]);

            if (songtime < seektime) return message.reply({embeds: [embedMessage("Please enter a valid seekpoint in seconds.")]});

            player.seek(seektime * 1000);
            await message.react("👍");
        } catch (err) {
            return message.reply({embeds: [embedMessage("Please enter a number.")]});
        }
    },
};
