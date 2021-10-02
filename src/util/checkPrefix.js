const prefix = require("../models/prefix")
const { DEFAULT_PREFIX } = require("../../config/config.json")

module.exports = async (message) => {
    try {
        const data = await prefix.findOne({ GuildID: message.guild.id });

        if (data) {
            message.client.prefix = data.Prefix;
        } else {
            message.client.prefix = DEFAULT_PREFIX;

            let newData = prefix({
                Prefix: DEFAULT_PREFIX,
                GuildID: message.guild.id,
            });
            await newData.save();
        }

        return [message, data];
    } catch (err) { }
}
