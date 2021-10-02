const createBar = require("string-progressbar");
const embedMessage = require("../../util/embedContent");

module.exports = {
  name: "np",
  aliases: ["nowplaying"],
  cooldown: 3,
  execute(message) {
    try {
      const player = message.client.manager.get(message.guild.id);
      if (!player || !player.playing)
        return message.reply({ embeds: [embedMessage("There is nothing playing in this server.")], });

      const song = player.queue.current;
      const seek = player.position / 1000;
      const left = song.duration / 1000 - seek;

      let nowPlaying = embedMessage()
        .setTitle("Now Playing")
        .addField("Track:", `[${song.title}](${song.uri})`, true)
        .addField("Requested By:", `<@${song.requester.id}>`, true)
        .setURL(song.uri);

      if (song.duration > 0 && player.position > 1000) {
        nowPlaying.addField(
          "\u200b",
          "`" + new Date(seek * 1000).toISOString().substr(11, 8) + createBar(song.isStream === true ? seek : song.duration / 1000, seek, 25)[0] + (song.isStream === true ? " ◉ LIVE" : new Date(song.duration).toISOString().substr(11, 8) + "`"),
          false
        );
        nowPlaying.setFooter(`Time Remaining: ${new Date(left * 1000).toISOString().substr(11, 8)}`);
      }

      return message.channel.send({ embeds: [nowPlaying] });
    } catch (err) { }
  },
};
