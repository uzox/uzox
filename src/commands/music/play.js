const embedMessage = require("../../util/embedContent");
const loadRes = require("../../util/loadRes");
const getRes = require("../../util/getRes");

module.exports = {
  name: "play",
  cooldown: 2,
  aliases: ["p", "join"],
  async execute(message, args) {
    const { channel } = message.member.voice;
    if (!channel) return message.channel.send({ embeds: [embedMessage("Join a voice channel.")] });
    if (!args[0] && message.command_name !== "play") return message.channel.send({ embeds: [embedMessage("Enter the name of a track you want to play.\nUsage: `play <name>`")] });

    let player = message.client.manager.get(message.guild.id);
    if (player) if (channel.id !== player.voiceChannel) return message.channel.send({ embeds: [embedMessage("Join my voice channel.")] });
    if (!player) {
      player = message.client.manager.create({
        guild: message.guild.id,
        voiceChannel: channel.id,
        textChannel: message.channel.id,
      });
    }
    if (player.state !== "CONNECTED") player.connect();
    if (player.paused && message.command_name == "play" && args[0])
      return message.client.commands.get("resume").execute(message);

    let search = args.join(" ");
    try {
      let res = await getRes(search, player, message);

      if (search.includes("open.spotify.com/"))
        await res.tracks.map(async (val, i) => { res.tracks[i].title = `${val.author} - ${val.title}` });

      await loadRes(res, player, message);
    } catch (err) {
      console.log(err)
      return message.channel.send({ embeds: [embedMessage(`There was an error playing **${search}**`)] });
    }
  },
};
