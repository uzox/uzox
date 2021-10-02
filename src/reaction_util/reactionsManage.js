const {canModifyQueue} = require("../reaction_util/queueModify");
const sendEmbed = require("../util/embedContent");

module.exports = {
    async reactionsManage(reaction, player, channel, member, guild, vc, client, user) {
        try{
            switch (reaction.emoji.name) {
                case "⏭":
                    reaction.users.remove(user).catch((err)=>{});
                    if (!(await canModifyQueue(member, guild, vc, channel, client))) return;
                    player.stop();
                    channel.send({embeds: [sendEmbed(`<@${member.id}> Skipped the track.`)]});
                    break;

                case "⏯":
                    reaction.users.remove(user).catch((err)=>{});
                    if (!(await canModifyQueue(member, guild, vc, channel, client))) return;
                    if (player.paused) {
                        player.pause(false);
                        channel.send({embeds: [sendEmbed(`<@${member.id}> Resumed the track.`)]});
                    } else {
                        player.pause(true);
                        channel.send({embeds: [sendEmbed(`<@${member.id}> Paused the track.`)]});
                    }
                    break;

                case "🔇":
                    reaction.users.remove(user).catch((err)=>{});
                    if (!(await canModifyQueue(member, guild, vc, channel, client))) return;
                    if (player.volume === 0) {
                        player.setVolume(100);
                        channel.send({embeds: [sendEmbed(`<@${member.id}> Unmuted the track.`)]});
                    } else if (player.volume > 0) {
                        player.setVolume(0);
                        channel.send({embeds: [sendEmbed(`<@${member.id}> Muted the track.`)]});
                    }
                    break;

                case "🔉":
                    reaction.users.remove(user).catch((err)=>{});
                    if (!(await canModifyQueue(member, guild, vc, channel, client))) return;
                    if (player.volume > 10) {
                        player.setVolume(player.volume - 10);
                        channel.send({embeds: [sendEmbed(`<@${member.id}> Decreased the volume by 10%.`)]});
                    } else if (player.volume <= 10 && player.volume > 0) {
                        player.setVolume(0);
                        channel.send({embeds: [sendEmbed(`<@${member.id}> Decreased the volume to 0%.`)]});
                    } else {
                        channel.send({embeds: [sendEmbed(`${member} The volume is at 0%.`)]});
                    }
                    break;

                case "🔊":
                    reaction.users.remove(user).catch((err)=>{});
                    if (!(await canModifyQueue(member, guild, vc, channel, client))) return;
                    if (player.volume < 90) {
                        player.setVolume(player.volume + 10);
                        channel.send({embeds: [sendEmbed(`<@${member.id}> Increased the volume by 10%.`)]});
                    } else if (player.volume >= 90 && player.volume < 100) {
                        player.setVolume(100);
                        channel.send({embeds: [sendEmbed(`<@${member.id}> Increased the volume to 100%.`)]});
                    } else {
                        channel.send({embeds: [sendEmbed(`<@${member.id}> The volume is at 100%.`)]});
                    }
                    break;

                case "🔁":
                    reaction.users.remove(user).catch((err)=>{});
                    if (!(await canModifyQueue(member, guild, vc, channel, client))) return;
                    player.setTrackRepeat(!player.trackRepeat);
                    const trackRepeat = player.trackRepeat ? "enabled" : "disabled";
                    channel.send({embeds: [sendEmbed(`<@${member.id}> Track repeat ${trackRepeat}.`)]});
                    break;

                case "⏹":
                    reaction.users.remove(user).catch((err)=>{});
                    if (!(await canModifyQueue(member, guild, vc, channel, client))) return;
                    player.destroy();
                    channel.send({embeds: [sendEmbed(`<@${member.id}> Stopped the music.`)]});
                    break;

                default:
                    reaction.users.remove(user).catch((err)=>{});
                    break;
            }
        } catch(err) {}
    },
};
