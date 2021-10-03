const embedContent = require("./embedContent");

module.exports = {
  async canModifyQueue(message, play, pn) {
    try {
      const player = message.client.manager.get(message.guild.id);
      if (!player && !play) {
        message.reply({ embeds: [embedContent(`${message.member.user} Nothing is playing here.`)] });
        return false;
      }

      const { channel } = message.member.voice;
      if (!channel) {
        message.reply({ embeds: [embedContent(`${message.member.user} Join a voice channel and enter this command.`)] });
        return false;
      }
      if (!player && pn && play) return true;
      if (channel.id !== player.voiceChannel) {
        message.reply({ embeds: [embedContent(`${message.member.user} Join the voice channel I'm in.`)] });
        return false;
      }
    } catch (err) {
      console.log(err);
    }
    return true;
  },
};
