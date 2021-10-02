const embedMessage = require("../../util/embedContent");
const { canModifyQueue } = require("../../util/queueModify");
const array_move = (arr, old_index, new_index) => {
    while (old_index < 0) old_index += arr.length;
    while (new_index < 0) new_index += arr.length;
    if (new_index >= arr.length) {
        let k = new_index - arr.length + 1;
        while (k--) arr.push(undefined);
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
}

module.exports = {
    name: "move",
    async execute(message, args, move) {
        try {
            if (!(await canModifyQueue(message))) return;
            if (!args[0] || !args[1]) return message.reply({ embeds: [embedMessage("Usage: move <song to move> <place to move>")] });

            const player = message.client.manager.get(message.guild.id);
            const songNum = Number(args[0]) - 1;
            const placeNum = Number(args[1]) - 1;
            const songlen = player.queue.size;

            if (placeNum < 0 || songlen < 1 || songlen < songNum + 1 || songlen < placeNum + 1) return message.channel.send({ embeds: [embedMessage("Usage: move <song to move> <place to move>")] });

            const songstemp = player.queue;
            const song_move = songstemp[songNum];

            const queuee = array_move(songstemp, songNum, placeNum);

            let i = 0;
            for (const g of queuee) {
                if (g === undefined) queuee.splice(i, 1);
                i++;
            }

            player.queue = queuee;
            if (move !== "no") return message.channel.send({ embeds: [embedMessage(`${message.member.user} Moved **${song_move.title}** to index **${placeNum + 1}** in the queue`)] });
        } catch (err) {
            return message.reply({ embeds: [embedMessage("Please enter a valid number from the queue.")] });
        }
    },
};
