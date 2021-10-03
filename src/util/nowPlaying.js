const embedContent = require("./embedContent");

module.exports = {
  async nowPlaying(player, client) {
    return embedContent(`[<:patreon:888775002168643587> \`Patreon\`](https://patreon.com/uzox)  |  [\`Invite\`](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot+applications.commands)  |  [\`Vote\`](https://top.gg/bot/${client.user.id})  |  [\`Support Server\`](https://discord.gg/GtNTAr5EWR)`)
      .addField("Track: ", `[\`${player.queue.current.title.substring(0, 100)}\`](${player.queue.current.uri})`, true)
      .addField("Requested By: ", `${player.queue.current.requester}`, true)
      .addField("Duration: ", `\`${!player.queue.current.isStream ? new Date(Math.floor(player.queue.current.duration)).toISOString().substr(11, 8) : "🔴 LIVE"}\``, true)
      .setImage("https://media1.tenor.com/images/b3b66ace65470cba241193b62366dfee/tenor.gif")
      .setColor("#FF0000")
      .setTitle("🎶 Now Playing");
  },
};
