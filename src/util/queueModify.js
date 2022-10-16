const embedContent = require("./embedContent");

module.exports = {
  async canModifyQueue(message, play, pn) {
    try {
      if (pn || play) return true;
      const player = await message.client.manager.queue.get(message.guild.id);
      if (!player?.player && !play) {
        message.reply({ embeds: [embedContent(`${message.member.user} Nothing is playing here.`)], ephemeral: true });
        return false;
      }

      const { channel } = message.member.voice;
      if (!channel) {
        message.reply({ embeds: [embedContent(`${message.member.user} Join a voice channel and enter this command.`)], ephemeral: true })
        return false;
      }

      if (channel.id !== message.guild.me.voice.channel.id) {
        message.reply({ embeds: [embedContent(`${message.member.user} Join the voice channel I'm in.`)], ephemeral: true })
        return false;
      }
    } catch (err) { }
    return true;
  },
};
