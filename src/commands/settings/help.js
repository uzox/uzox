const embedMessage = require("../../util/embedContent");

module.exports = {
  name: "help",
  aliases: ["h"],
  cooldown: 5,
  execute(message, args) {
    if (!args[0])
      return message.reply({
        embeds: [embedMessage(
          "Enter `help` followed by one of the number of the types of commands.\nUsage: `help <number>`"
        )
          .setTitle("Categories Of Bot Commands")
          .addField(
            "1. 🎶 Track Control Commands",
            "Commands to control the track playing in the server.",
            true
          )
          .addField(
            "2. 📜 Queue Control Commands",
            "Commands to control the queue of the server.",
            true
          )
          .addField(
            "3. ⚙️ Bot Settings",
            "Commands to configure the settings of the bot for this server.",
            true
          )
          .addField(
            "🥇 Support Us",
            `**[<:patreon:888775002168643587> \`Patreon\`](https://patreon.com/uzox) (Supports us the most)**\n[\`Invite\`](https://discord.com/oauth2/authorize?client_id=${message.client.user.id}&permissions=8&scope=bot+applications.commands)  |  [\`Vote\`](https://top.gg/bot/${message.client.user.id})  |  [\`Support Server\`](https://discord.gg/GtNTAr5EWR)`
          )
          .setFooter(
            `${message.author.tag}`,
            message.author.displayAvatarURL({ size: 64, dynamic: true })
          )]
      });

    args[0] = args[0].toLowerCase();

    if (
      args[0] === "1" ||
      args[0].toLowerCase() === "music" ||
      args[0].toLowerCase() === "track"
    ) {
      message.reply({
        embeds: [embedMessage(
          "**`play`:** Enter song name or link from Spotify/YouTube/Soundcloud/Twitch(Live) and more to play a Song/Playlist.\n\n**`skip`:** Skips the current playing sound / adds vote to skip(If DJ mode is enabled).\n\n**`stop`:** Clears queue and disconnects bot from the voice channel.\n\n**`pause`:** Pauses current song.\n\n**`resume`:** Resumes the paused song.\n\n**`search`:** Searches for tracks on YouTube based on given name.\n\n**`nowplaying`:** Shows track being played currently.\n\n**`playnext`:** Plays given track next.\n\n**`seek`:** Seeks to given timestamp in track.\n\n**`forward`:** Forwards by given amount of time.\n\n**`lyrics`:** Shows you the lyrics for a playing song or for a given search term."
        )
          .setTitle("🎶 Music Control Commands")
          .setFooter(
            `Requested by: ${message.author.tag}`,
            message.author.displayAvatarURL({ size: 64, dynamic: true })
          )]
      });
    }
    if (
      args[0] === "2" ||
      args[0].toLowerCase() === "queue" ||
      args[0].toLowerCase() === "q"
    ) {
      message.reply({
        embeds: [embedMessage(
          "**`queue`**: Lists the current queue.\n\n**`remove`**: Removes given track position from queue.\n\n**`skipto`**: Skips to given track position in queue.\n\n**`loop`**: Loops current track/queue.\n\n**`move`**: Moves a track from one position to another in the queue.\n\n**`previous`**: Plays the previous track from the queue.\n\n**`jump`**: Jumps to a given track in queue without removing tracks in between."
        )
          .setTitle("📜 Queue Control Commands")
          .setFooter(
            `Requested by: ${message.author.tag}`,
            message.author.displayAvatarURL({ size: 64, dynamic: true })
          )]
      });
    }
    if (args[0] === "10" || args[0].toLowerCase() === "settings") {
      message.reply({
        embeds: [embedMessage(
          "**`setprefix`**: Changes the bot prefix for the server."
        )
          .setTitle("⚙️ Bot Settings")
          .setFooter(
            `Requested by: ${message.author.tag}`,
            message.author.displayAvatarURL({ size: 64, dynamic: true })
          )]
      });
    }
  },
};
