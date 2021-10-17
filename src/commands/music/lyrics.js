const embedMessage = require("../../util/embedContent");
const fetchLyrics = require("../../util/fetchLyrics");

module.exports = {
  name: "lyrics",
  aliases: ["ly"],
  cooldown: 5,
  async execute(message, args) {
    const player = message.client.manager.get(message.guild.id);
    if (!args[0] && !player)
      return message.reply({
        embeds: [
          embedMessage(
            "There is nothing playing here to show the lyrics.\nUsage: `lyrics <song>`"
          ),
        ],
      });

    let title, track, lyrics;

    if (!args[0]) title = player.queue.current.title;
    else title = args.join(" ");

    try {
      track = await fetchLyrics(title);
      lyrics = track && track?.lyrics ? track.lyrics : `No lyrics found for ${title}.`;
    } catch (error) {
      lyrics = `No lyrics found for ${title}.`;
    }

    if (lyrics.includes("Paroles de la chanson")) {
      lyrics = lyrics.split("\n")
      lyrics.shift();
      lyrics = lyrics.join("\n")
    }

    let lyricsEmbed = embedMessage(lyrics);
    if (track.title)
      lyricsEmbed.setTitle(`${track.title}\n${track.artist}`);

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 4093)}...`;
    return message.reply({ embeds: [lyricsEmbed] }).catch((err) => { });
  },
};
