const embedMessage = require("../../util/embedContent");
const { canModifyQueue } = require("../../util/queueModify");

module.exports = {
    name: "loop",
    async execute(message, type) {
        if (!(await canModifyQueue(message))) return;
        const player = await message.client.manager.queue.get(message.guild.id);

        if (message.options?.get("type")?.value == "track" || type == "track") {
            player.repeat = player.repeat == 1 ? 0 : 1;
            return message.reply({ embeds: [embedMessage(`${message.member.user} Track repeat is now **${player.repeat ? "enabled" : "disabled"}**.`)] });
        }
        player.repeat = player.repeat == 2 ? 0 : 2;
        return message.reply({ embeds: [embedMessage(`${message.member.user} Queue repeat is now **${player.repeat == 2 ? "enabled" : "disabled"}**.`)] });
    },
};
