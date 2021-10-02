module.exports = {
    async clearPlayers(client) {
        setInterval(async () => {
            await client.manager.players.forEach(async (p) => {
                if (!p.playing) await p.destroy();
                else if (p.guild) {
                    const guild = await client.guilds.cache.get(p.guild);
                    if (!guild.me.voice) await p.destroy();
                    else if (!guild.me.voice.channel) await p.destroy();
                }
            })
        }, 120000)
    },
};
