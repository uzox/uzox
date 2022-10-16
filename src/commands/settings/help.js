const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder } = require("discord.js");
const embedMessage = require("../../util/embedContent");

module.exports = {
    name: "help",
    aliases: ["h"],
    cooldown: 5,
    description: "Display all commands and descriptions",
    execute(message, args) {
        const helpAll = embedMessage(
            "**Pick a category from the following:**\n**🎶 Track\n📜 Queue\n\n⚙️ Settings**\n\n**Try these basic commands to get you started:**\n**`play`:** Enter a track name or URL to play.\n**`search`:** Search and play tracks.\n"
        ).setTitle("Help Section")

        const row1 = new ActionRowBuilder().setComponents(
            new ButtonBuilder().setURL("https://ko-fi.com/moquent").setEmoji({ id: "951195435639377920" }).setLabel("Donate").setStyle(ButtonStyle.Link),
            new ButtonBuilder().setURL(`https://discord.com/oauth2/authorize?client_id=${message.client.user.id}&permissions=8&scope=bot+applications.commands`).setEmoji({ id: "882293066575249458" }).setLabel("Invite").setStyle(ButtonStyle.Link),
            new ButtonBuilder().setURL("https://uzox.xyz/youtube").setEmoji({ id: "932924509252648980" }).setLabel("Setup").setStyle(ButtonStyle.Link),
            new ButtonBuilder().setURL("https://discord.gg/GtNTAr5EWR").setEmoji({ id: "932924508963233823" }).setLabel("Support").setStyle(ButtonStyle.Link)
        )
        const row2 = new ActionRowBuilder().setComponents(
            new SelectMenuBuilder().setCustomId(message.author.id).setMinValues(1).setMaxValues(1).setPlaceholder("Choose a category")
                .addOptions({ label: "Track", value: "track", description: "Control the track playing in the server", emoji: { name: "🎶" } })
                .addOptions({ label: "Queue", value: "queue", description: "Control the queue of the server", emoji: { name: "📜" } })
                .addOptions({ label: "Settings", value: "settings", description: "Configure Uzox in the server", emoji: { name: "⚙️" } })
        )
        return message.reply({ embeds: [helpAll], components: [row2, row1] });
    },
};
