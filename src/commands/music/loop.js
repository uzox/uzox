const embedMessage = require("../../util/embedContent");
const {canModifyQueue} = require("../../util/queueModify");

module.exports = {
    name: "loop",
    aliases: ["l"],
    async execute(message, args) {
        if (!(await canModifyQueue(message))) return;
        const player = await message.client.manager.get(message.guild.id);

        if (args.length && (/queue/i.test(args[0]) || /q/i.test(args[0]))) {
            await player.setQueueRepeat(!player.queueRepeat);
            const queueRepeat = player.queueRepeat ? "enabled" : "disabled";
            return message.reply({embeds: [embedMessage(`${message.member.user} Queue repeat is now ${queueRepeat}.`)]});
        }

        await player.setTrackRepeat(!player.trackRepeat);
        const trackRepeat = player.trackRepeat ? "enabled" : "disabled";
        return message.reply({embeds: [embedMessage(`${message.member.user} Track repeat is now ${trackRepeat}.`)]});
    },
};
