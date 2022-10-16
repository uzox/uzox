const { canModifyQueue } = require("../../util/queueModify");
const { isDJ } = require("../../util/isDJ");
const embedMessage = require("../../util/embedContent");

async function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

module.exports = {
    name: "shuffle",
    async execute(message) {
        if (!(await canModifyQueue(message)) || !(await isDJ(message))) return;
        const player = message.client.manager.queue.get(message.guild.id);

        player.queue = await shuffle(player.queue);
        return message.reply({ embeds: [embedMessage(`${message.author} **Shuffled** the queue`)] });
    },
};
