const {canModifyQueue} = require("../../util/queueModify");
const embedMessage = require("../../util/embedContent");

module.exports = {
    name: "seek",
    aliases: ["sk"],
    async execute(message, args) {
        let seektime;
        try {
            if (!(await canModifyQueue(message))) return;

            const player = message.client.manager.get(message.guild.id);
            if (player.queue.current.isStream) return message.reply({embeds: [embedMessage("I can't seek live streams.")]});

            const songtime = player.queue.current.duration / 1000;
            if (!args[1] && args[0].includes(":")) {
                const str = args[0];
                const p = str.split(":");
                let s = 0,
                    m = 1;

                while (p.length > 0) {
                    s += m * parseInt(p.pop(), 10);
                    m *= 60;
                }
                seektime = s;
            } else {
                seektime = 0;
                const argss = args;
                if (argss[0].slice(-1) === "h" && songtime < 3600) return message.reply({embeds: [embedMessage("The total time of this audio is less than 1 hour.")]});
                if (argss[0].slice(-1) === "m" && songtime < 60) return message.reply({embeds: [embedMessage("The total time of this audio is less than 1 minute.")]});
                if (argss[0].slice(-1) === "s" && songtime < 1) return message.reply({embeds: [embedMessage("The total time of this audio is less than 1 second.")]});

                if (argss[0] && argss[0].slice(-1) === "h") {
                    seektime += Number(argss[0].substring(0, argss[0].length - 1)) * 3600;
                    argss.splice(0, 1);
                }
                if (argss[0] && argss[0].slice(-1) === "m") {
                    seektime += Number(argss[0].substring(0, argss[0].length - 1)) * 60;
                    argss.splice(0, 1);
                }
                if (argss[0] && argss[0].slice(-1) === "s") {
                    seektime += Number(argss[0].substring(0, argss[0].length - 1));
                    argss.splice(0, 1);
                } else if (argss[0]) return message.reply({embeds: [embedMessage("Please type in the format `10s` | `1m 10s` | `1h 10m 10s`")]});
            }
            if (songtime < seektime) return message.reply({embeds: [embedMessage("Please enter a valid seekpoint.")]});

            await message.react("👍");
            player.seek(seektime * 1000);
        } catch (err) {
            return message.reply({embeds: [embedMessage("Please type in the format `10s` | `1m 10s` | `1h 10m 10s`")]});
        }
    },
};
