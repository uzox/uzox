const embedMessage = require("../../util/embedContent");
const prefix = require("../../models/prefix");

module.exports = {
  name: "command",
  cooldown: 3,
  async execute(message, args) {
    if (!message.member.permissions.has("MANAGE_GUILD")) return message.reply({ embeds: [embedMessage(`${message.author} You don't have the \`Manage Server\` permission to do that.`)] });
    if (!args[0]) return message.reply({ embeds: [embedMessage(`${message.author} Which command do you want to toggle on/off for this server?`)] });

    const { client } = message;
    const command_name = args[0].toLowerCase();
    const command =
      (await client.commands.get(command_name)) ||
      (await client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(command_name)
      ));

    if (!command)
      return message.reply({ embeds: [embedMessage(`${message.author} That command doesn't exist.`)] });

    const { data } = message;

    if (!data.Disabled) data.Disabled = [];
    if (!data.Disabled.includes(command.name)) {
      data.Disabled.push(command.name);
      message.reply({ embeds: [embedMessage(`${message.author} The ${command.name} command has been **disabled** for this server.`)] });
    } else {
      data.Disabled.splice(data.Disabled.indexOf(command.name), 1);
      message.reply({ embeds: [embedMessage(`${message.author} The ${command.name} command has been **enabled** for this server.`)] });
    }

    await prefix.findOneAndRemove({ GuildID: message.guild.id });
    const newData = prefix({
      GuildID: data.GuildID,
      Prefix: data.Prefix,
      Disabled: data.Disabled,
    });
    await newData.save();
  },
};
