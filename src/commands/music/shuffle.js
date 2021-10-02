const {canModifyQueue} = require("../../util/queueModify");
const embedMessage = require("../../util/embedContent");

module.exports = {
    name: "shuffle",
    description: "Shuffle queue",
    aliases: ["sh"],
    async execute(message) {
        if (!(await canModifyQueue(message))) return;
        const player = message.client.manager.get(message.guild.id);
        let songs = player.queue;

        for (let i = songs.length - 1; i > 1; i--) {
            let j = 1 + Math.floor(Math.random() * i);
            [songs[i], songs[j]] = [songs[j], songs[i]];
        }

        player.queue = songs;
        return message.reply({embeds: [embedMessage(`${message.author} Shuffled the queue`)]});
    },
};
