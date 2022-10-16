const createBar = require("string-progressbar");
const embedMessage = require("../../util/embedContent");

module.exports = {
  name: "nowplaying",
  execute(message) {
    try {
      const player = message.client.manager.queue.get(message.guild.id);
      if (!player || !player?.current) return message.reply({ embeds: [embedMessage("There is nothing playing in this server.")], ephemeral: true });

      const song = player.current.info;
      const seek = player.player.position / 1000;
      const left = song.length / 1000 - seek;

      let nowPlaying = embedMessage()
        .addFields({ name: "Track:", value: `[\`${song.title}\`](${song.uri})`, inline: true })
        .addFields({ name: "Requested By:", value: `<@${song.requester.id}>`, inline: true })

      if (song.length > 0 && player.player.position > 1000) {
        nowPlaying
          .addFields({
            name: "\u200b", value: `\`${new Date(seek * 1000).toISOString().substr(11, 8)}` +
              createBar(song.isStream === true ? seek : song.length / 1000, seek, 25)[0] +
              (song.isStream === true ? " ◉ LIVE" :
                ` ${new Date(song.length).toISOString().substr(11, 8)}\``),
            inline: false
          })
          .setFooter({ text: "Time Remaining: " + new Date(left * 1000).toISOString().substr(11, 8) });
      }

      return message.reply({ embeds: [nowPlaying], ephemeral: true });
    } catch (err) { console.log(err) }
  },
};
