const embedContent = require("./embedContent");
const createPlayerButtons = require("./createPlayerButtons");

module.exports = {
  async nowPlaying(track, client) {
    try {
      let seconds = Math.floor(track.info.length / 1000);
      let durat = track.info.isStream ? "🔴 LIVE" : new Date(seconds * 1000).toISOString().substr(11, 8);
      let messembed = embedContent(`<:patreon:888775002168643587> [\`Donate\`](https://patreon.com/uzox)  |  [\`Invite\`](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot+applications.commands)  |  [\`Vote\`](https://top.gg/bot/760027263046909992)  |  [\`Community\`](https://discord.gg/GtNTAr5EWR)`)
        .addFields({ name: "Track: ", value: `[\`${track.info.title.substring(0, 100)}\`](${track.info.uri})`, inline: true })
        .addFields({ name: "Requested By: ", value: `${track.info.requester}`, inline: true })
        .addFields({ name: "Duration: ", value: `\`${durat}\``, inline: true })
        .setImage("https://media1.tenor.com/images/b3b66ace65470cba241193b62366dfee/tenor.gif")
        .setColor("#FF0000")
        .setFooter({ text: "~ /donate for private music bots ~" })
        .setTitle("🎶 Now Playing");

      return { embeds: [messembed], components: createPlayerButtons };
    } catch (err) { console.log(err) }
  },
};
