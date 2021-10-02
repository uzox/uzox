const embedMessage = require("../util/embedContent");

module.exports = {
  async handleQueueEnd(player, client) {
    try {
      client.channels.cache
        .get(player.textChannel)
        .send({ embeds: [embedMessage(`Queue has ended, add some more maybe.`)] });

      if (player.collector) player.collector.stop();
      if (player.queue.playingmessage) player.queue.playingmessage.delete().catch((err) => { });

      await player.destroy();
    } catch (err) {
      try {
        await player.destroy();
      } catch (err) { }
    }
  },
};
