const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports =
    [
        new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("slash-previous")
                .setStyle(ButtonStyle.Secondary)
                .setEmoji({ id: "932896641453801493" }),
            new ButtonBuilder()
                .setCustomId("slash-pause")
                .setStyle(ButtonStyle.Secondary)
                .setEmoji({ id: "932896007526707271" }),
            new ButtonBuilder()
                .setCustomId("slash-skip")
                .setStyle(ButtonStyle.Secondary)
                .setEmoji({ id: "932896007509925918" }),
        ),
        new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("slash-mute")
                .setStyle(ButtonStyle.Secondary)
                .setEmoji({ id: "932898291522367488" }),
            new ButtonBuilder()
                .setCustomId("slash-volume_down")
                .setStyle(ButtonStyle.Secondary)
                .setEmoji({ id: "932905272060542996" }),
            new ButtonBuilder()
                .setCustomId("slash-volume_up")
                .setStyle(ButtonStyle.Secondary)
                .setEmoji({ id: "932898292084383785" })
        ),
        new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("slash-loop")
                .setStyle(ButtonStyle.Secondary)
                .setEmoji({ id: "932908564949925938" }),
            new ButtonBuilder()
                .setCustomId("slash-stop")
                .setStyle(ButtonStyle.Danger)
                .setEmoji({ id: "932908751940382730" }),
            new ButtonBuilder()
                .setCustomId("slash-shuffle")
                .setStyle(ButtonStyle.Secondary)
                .setEmoji({ id: "932908430983823370" })
        )
    ]
