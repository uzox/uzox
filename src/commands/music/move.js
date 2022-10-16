const embedMessage = require("../../util/embedContent");
const { canModifyQueue } = require("../../util/queueModify");

function array_move(arr, old_index, new_index) {
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
    async execute(message) {
        try {
            if (!(await canModifyQueue(message))) return;

            const player = message.client.manager.queue.get(message.guild.id);
            const songNum = message.options.get("position").value - 1;
            const placeNum = message.options.get("destination").value - 1;
            const songlen = player.queue.length;

            if (placeNum < 0 || songlen < 1 || songlen < songNum + 1 || songlen < placeNum + 1)
                return message.reply({ embeds: [embedMessage("Enter valid positions to move the tracks in the queue")], ephemeral: true });

            const song_move = songstemp[songNum];
            player.queue = array_move(player.queue, songNum, placeNum);
            return message.reply({ embeds: [embedMessage(`${message.member.user} Moved **${song_move.info.title}** to index **${placeNum + 1}** in the queue`)] });
        } catch (err) {
            console.log(err)
            return message.reply({ embeds: [embedMessage("Please enter a valid number from the queue.")], ephemeral: true });
        }
    },
};
