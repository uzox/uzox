const embedContent = require("../util/embedContent");
const buttonsFunctions = require("../reaction_util/buttonsFunctions");
const defaultchannel = require("../models/defaultchannel");

module.exports = {
    async handleNewInteraction(interaction) {
        try {
            let channel = (await defaultchannel.findOne({ GuildID: interaction.guild.id }))?.ChannelID;
            if (channel && channel !== interaction.channel.id) {
                if (!["setdefaultchannel", "removedefaultchannel"].includes(interaction.commandName)) {
                    try { return interaction.reply({ embeds: [embedContent(`The default text channel you can run commands in is <#${(await defaultchannel.findOne({ GuildID: interaction.guild.id }))?.ChannelID}>\n\nIf you can't see/open this channel, it's probably because you don't have access to it.`)], ephemeral: true }) } catch (err) { }
                    return;
                }
            }
            if (interaction.isButton()) {
                interaction.author = interaction.user;
                await interaction.deferReply();
                interaction.reply = interaction.followUp;
                const command = (await interaction.client.commands.get(interaction.customId));
                if (command) return await command.execute(interaction);

                await require("../util/queueModify").canModifyQueue(interaction)
                return await buttonsFunctions[interaction.customId.split("-")[1]](interaction);
            }
            if (interaction.isChatInputCommand()) {
                const command = (await interaction.client.commands.get(interaction.commandName == "playfile" ? "play" : interaction.commandName));
                if (!command) return;

                try {
                    interaction.guild.me = interaction.guild.members.cache.get(interaction.client.user.id)
                    interaction.author = interaction.user;
                    await command.execute(interaction);
                } catch (err) {
                    console.log(err)
                    try { return interaction.reply({ embeds: [embedContent(`There was an error executing that command, if this error continues please join this server to contact us https://discord.gg/Nvr8hBe9Rr`)], ephemeral: true }).catch((err) => { }); } catch (err) { }
                }
            }
            if (interaction.isSelectMenu()) {
                interaction.author = interaction.user;

                if (interaction.message.interaction.commandName == "help") {
                    let helpEmbed;
                    if (interaction.values[0] == "track") {
                        helpEmbed = embedContent(
                            "**`play`:** Enter a track name or URL to play.\n**`skip`:** Skip the current playing track / vote to skip.\n**`pause`:** Pause the current track.\n**`resume`:** Resume the current track.\n**`search`:** Search for tracks on YouTube with a query.\n**`nowplaying`:** Show the track being played currently.\n**`playnext`:** Play a given track next.\n**`playfile`:** Play a given file (Supports most types).\n**`seek`:** Seek to a given position in track.\n**`forward`:** Forward the track.\n\n"
                        )
                            .setTitle("🎶 Music Control Commands")

                        interaction.reply({ embeds: [helpEmbed], ephemeral: true });
                    }

                    else if (interaction.values[0] == "queue") {
                        helpEmbed = embedContent(
                            "**`queue`**: List the current queue.\n**`stop`:** Clear queue and disconnect bot from the voice channel.\n**`shuffle`:** Shuffle all the tracks in the queue.\n**`remove`**: Remove a track from the queue.\n**`skipto`**: Skip to a track in the queue.\n**`loop`**: Loop the current track/queue.\n**`move`**: Move a track from one position to another in the queue.\n**`previous`**: Play the previous track.\n**`jump`**: Jump to a track in the queue without removing tracks in between.\n\n"
                        )
                            .setTitle("📜 Queue Control Commands")

                        interaction.reply({ embeds: [helpEmbed], ephemeral: true });
                    }

                    else if (interaction.values[0] == "settings") {
                        helpEmbed = embedContent(
                            "**`setdefaultchannel`**: Configure a default channel to listen to.\n**`removedefaultchannel`**: Remove the configuration to listen to a specific channel.\n\n"
                        )
                            .setTitle("⚙️ Bot Settings")

                        interaction.reply({ embeds: [helpEmbed], ephemeral: true });
                    }
                }

                else if (interaction.message.interaction.commandName == "search") {
                    await interaction.deferReply();
                    interaction.reply = interaction.followUp;
                    interaction.search = true;
                    await interaction.client.commands.get("play").execute(interaction, undefined, interaction.values[0]);
                    await interaction.message.delete().catch(err => { });
                }
            }
        } catch (err) {
            console.log(err)
            try { return interaction.reply({ embeds: [embedContent(`There was an error executing that command, if this error continues please join this server to contact us https://discord.gg/Nvr8hBe9Rr`)], ephemeral: true }).catch((err) => { }); } catch (err) { }
        }
    },
};
