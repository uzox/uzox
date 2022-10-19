const aero = require("@aero/centra");
const embedMessage = require("../../util/embedContent");
const { MICROSERVICES_API } = require("../../../config/config.json");

module.exports = {
  name: "lyrics",
  async execute(message) {
    const player = message.client.manager.queue.get(message.guild.id);
    if (!message.options?.get("name")?.value && !player?.current)
      return message.reply({ embeds: [embedMessage("There is nothing playing here to show the lyrics.")], ephemeral: true });

    let track, query = message.options?.get("name")?.value ? message.options.get("name").value : player?.current?.info?.title;
    try {
      track = (await aero(`${MICROSERVICES_API}lyrics/${encodeURIComponent(query)}`).send()).json
      if (track.lyrics >= 4096)
        track.lyrics = `${track.lyrics.substr(0, 4093)}...`;
      let lyricsEmbed = embedMessage(track.lyrics);
      if (track.title) lyricsEmbed.setTitle(`${track.title}\n${track.artist}`);

      return message.reply({ embeds: [lyricsEmbed], content: `${message.member.user}` }).catch((err) => { });
    } catch (err) {
      return message.reply({ embeds: [embedContent(`No lyrics found for ${query}`)], ephemeral: true }).catch((err) => { });
    }
  },
};
