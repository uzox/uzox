const { canModifyQueue } = require("../../util/queueModify");
const embedMessage = require("../../util/embedContent");

module.exports = {
    name: "volume",
    async execute(message, vol, t) {
        if (!(await canModifyQueue(message))) return;
        const player = message.client.manager.queue.get(message.guild.id);
        let volume = 0;
        try{
            volume = vol ? vol : message.options.get("volume")?.value;
        }catch(e){      
            volume = vol;
        }

        if (!volume && volume !== 0) return message.reply({ embeds: [embedMessage(`The player volume is at **\`${player.volume}%\`**.`)], ephemeral: true });
        if ((volume < 0 || volume > 100) && !vol) return message.reply({ embeds: [embedMessage(`Please enter a value between **0 and 100**`)], ephemeral: true });

        if(volume == 0){
            await player.player.setVolume(0);
        }else{
            await player.player.setVolume(volume / 100);
        }
        if (t) return true;
        return message.reply({ embeds: [embedMessage(`${message.member.user} Set the player volume to **\`${volume}\`**.`)] });
    },
};
