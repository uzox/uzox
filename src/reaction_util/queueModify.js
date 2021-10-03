const embedContent = require("../util/embedContent");

module.exports = {
    async canModifyQueue(member, guild, voiceChannel, textChannel, client) {
        try {
            const player = await client.manager.get(guild.id);
            const { channel } = member.voice;
            if (!player) {
                textChannel.send({ embeds: [embedContent(`${member} Nothing is playing here.`)] });
                return false;
            }
            if (!player.voiceChannel) {
                textChannel.send({ embeds: [embedContent(`${member} Nothing is playing here.`)] });
                return false;
            }
            if (!channel) {
                textChannel.send({ embeds: [embedContent(`${member} Join my voice channel.`)] });
                return false;
            }
            if (channel.id !== voiceChannel.id) {
                textChannel.send({ embeds: [embedContent(`${member} Join my voice channel.`)] });
                return false;
            }
        } catch (err) { }
        return true;
    },
};
