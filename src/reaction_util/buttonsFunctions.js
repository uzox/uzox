const embedContent = require("../util/embedContent");

module.exports = {
    async pause(interaction) {
        const player = interaction.client.manager.queue.get(interaction.guild.id);
        if (player?.player?.paused) await (require("../commands/music/resume")).execute(interaction)
        else await (require("../commands/music/pause")).execute(interaction)
    },
    async skip(interaction) {
        await (require("../commands/music/skip")).execute(interaction)
    },
    async mute(interaction) {
        const player = interaction.client.manager.queue.get(interaction.guild.id);
        if (player.player.volume < 0.5) {
            let r = await (require("../commands/music/volume")).execute(interaction, 100, "yes")
            player.player.volume = 1;
            if (r) interaction.reply({ embeds: [embedContent(`<@${interaction.member.id}> **Unmuted** the track.`)] });
        } else if (player.player.volume > 0) {
            let r = await (require("../commands/music/volume")).execute(interaction, 0, "yes")
            player.player.volume = 0;
            if (r) interaction.reply({ embeds: [embedContent(`<@${interaction.member.id}> **Muted** the track.`)] });
        }
    },
    async volume_down(interaction) {
        const player = interaction.client.manager.queue.get(interaction.guild.id);
        if (player.player.volume >= 0.1) {
            await (require("../commands/music/volume")).execute(interaction, (player.player.volume * 100) - 10)
            player.player.volume = Number(player.player.volume - 0.1).toFixed(2);
        } else if (player.player.volume <= 0.1 && player.player.volume > 0) {
            await (require("../commands/music/volume")).execute(interaction, 0)
            player.player.volume = 0;
        }
    },
    async volume_up(interaction) {
        const player = interaction.client.manager.queue.get(interaction.guild.id);
        if (player.player.volume <= 0.9) {
            await (require("../commands/music/volume")).execute(interaction, (player.player.volume * 100) + 10)
            player.player.volume = Number(player.player.volume + 0.1).toFixed(2);
        } else if (player.player.volume >= 0.9 && player.player.volume < 1) {
            await (require("../commands/music/volume")).execute(interaction, 100)
            player.player.volume = 1;
        }
    },
    async loop(interaction) {
        await (require("../commands/music/loop")).execute(interaction, "track")
    },
    async stop(interaction) {
        await (require("../commands/music/stop")).execute(interaction)
    },
    async shuffle(interaction) {
        await (require("../commands/music/shuffle")).execute(interaction)
    },
    async previous(interaction) {
        await (require("../commands/music/previous")).execute(interaction, "gfi")
    }
};