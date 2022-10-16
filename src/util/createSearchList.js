const { SelectMenuBuilder, ActionRowBuilder } = require("discord.js");

module.exports = async (content, author) => {
    let dat = new SelectMenuBuilder().setPlaceholder("Choose a track").setMinValues(1).setMaxValues(1).setCustomId(author);
    await content.map(async (data, index) => await dat.addOptions({ label: `${index + 1}. ${data.info.title}`, value: data.info.uri, description: `${data.info.author}` }));
    return new ActionRowBuilder().setComponents(dat);
};
