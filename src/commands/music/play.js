const embedMessage = require("../../util/embedContent");

module.exports = {
  name: "play",
  async execute(message, optionalQuery) {
    if (!message.member.voice.channel)
      return message.reply({ embeds: [embedMessage("Join a voice channel.")], ephemeral: true });
    if (message.guild.me.voice.channel && !message.guild.me.voice.channel.equals(message.member.voice.channel))
      return message.reply({ embeds: [embedMessage("Join my voice channel.")], ephemeral: true });

    let search = message.commandName == "playfile" ? message.options?.getAttachment("file")?.url :
      optionalQuery ? optionalQuery : message.options.get("query")?.value, res,
      node = await message.client.manager.getNode();

    try {
      if (!message.search) {
        try {
          await message.deferReply();
        } catch (err) { }
        message.reply = message.followUp;
      }

      res = await getRes(search, node);
      if (!res?.tracks?.length && !fav) return await message.reply({ embeds: [embedMessage("Couldn't find a matching track.")], ephemeral: true });
      await loadRes(res, node, message);
    } catch (err) {
      return message.reply({ embeds: [embedMessage(`There was an error playing **${search}**.`)], ephemeral: true });
    }

    async function loadRes(res, node, message) {
      let track = res.tracks.shift();
      track.info.requester = message.author;
      let q = await message.client.manager.queue.handle(message.guild, message.member, message.channel, node, track);
      q?.play();

      if (res.type.toLowerCase() == "playlist") {
        for (const track of res.tracks) {
          track.info.requester = message.author;
          await message.client.manager.queue.handle(message.guild, message.member, message.channel, node, track);
        }

        message.reply({
          embeds: [embedMessage()
            .addFields({ name: "Playlist Queued: ", value: `\`${res.playlistName.substring(0, 100)}\``, inline: true })
            .addFields({ name: "Requested By: ", value: `${message.author}`, inline: true })
            .addFields({ name: "Number Of Tracks:", value: `\`${res.tracks.length + 1}\``, inline: true })]
        });
        try { return setTimeout(async () => await message.deleteReply(), 40000) } catch (err) { return }
      }

      message.reply({
        embeds: [embedMessage()
          .addFields({ name: "Track Queued: ", value: `[\`${track.info.title.substring(0, 100)}\`](${track.info.uri})`, inline: true })
          .addFields({ name: "Requested By: ", value: `${message.author}`, inline: true })
          .addFields({ name: "Duration: ", value: track.info.isStream ? `\`🔴 LIVE\`` : `\`${new Date(track.info.length).toISOString().substr(11, 8)}\``, inline: true })]
      });
      try { return setTimeout(async () => await message.deleteReply(), 60000) } catch (err) { return }
    }
  },
};

async function getRes(t, node) {
  try {
    new URL(t)
    res = await node.rest.resolve(t);
    if (!res) {
      for (let i = 0; i < 5; i++) {
        res = await node.rest.resolve(t);
        if (res) break;
      }
    }
    return res;
  } catch (err) {
    res = await node.rest.resolve(`ytsearch:${t}`);
    if (!res) {
      for (let i = 0; i < 5; i++) {
        res = await node.rest.resolve(`ytsearch:${t}`);
        if (res) break;
      }
    }
    return res;
  }
}
