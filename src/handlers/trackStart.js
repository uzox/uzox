const { nowPlaying } = require("../util/nowPlaying");
const { reactionsManage } = require("../reaction_util/reactionsManage");

module.exports = {
  async handleTrackStart(player, track, client) {
    try {
      const channel = await client.channels.cache.get(player.textChannel);
      const vc = await client.channels.cache.get(player.voiceChannel);
      const guild = await client.guilds.cache.get(player.guild);

      if (player.collector) player.collector.stop();
      if (player.queue.playingmessage) await player.queue.playingmessage.delete().catch(err => { });

      if (vc === undefined || guild.me.voice.channel.members.size === 1) return await player.destroy();

      player.queue.current.skippers = [];
      if (guild.me.voice.channel.stageInstance) {
        try {
          await guild.me.voice.setSuppressed(false);
        } catch (err) { }
      }

      try {
        await channel
          .send({ embeds: [await nowPlaying(player, client)] })
          .then(async (playingMessage) => {
            await playingMessage.react("⏯");
            await playingMessage.react("🔇");
            await playingMessage.react("⏭");
            await playingMessage.react("🔉");
            await playingMessage.react("🔊");
            await playingMessage.react("🔁");
            await playingMessage.react("⏹");

            const filter = (reaction, user) => user.id !== client.user.id;
            const collector = playingMessage.createReactionCollector({
              filter: filter,
              time: player.queue.current.duration > 0 ? player.queue.current.duration * 1000 : 600000,
            });

            player.collector = collector;
            collector.on("collect", async (reaction, user) => {
              if (player?.queue?.current) await reactionsManage(reaction, player, channel, await guild.members.cache.get(user.id), guild, vc, client, user);
            });

            collector.on("end", () => {
              playingMessage.reactions.removeAll().catch((err) => { });
            });
          });
      } catch (err) { console.log(err) }
    } catch (err) { }
  },
};
