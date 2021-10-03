const { Collection } = require("discord.js");
const embedContent = require("../util/embedContent");
const checkPrefix = require("../util/checkPrefix");
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

module.exports = {
  async handleNewMessage(message, cooldowns) {
    try {
      if (!message.guild || message.author.bot) return;

      [message, guildInfo] = await checkPrefix(message);

      if (message.mentions.members.size === 1)
        if (message.mentions.members.first().id === message.client.user.id)
          await message.reply(`${message.guild.name}'s prefix is \`${message.client.prefix}\``);

      const prefixRegex = new RegExp(`^(<@!?${message.client.user.id}>|${escapeRegex(message.client.prefix)})\\s*`);
      if (!prefixRegex.test(message.content)) return;

      const [, matchedPrefix] = message.content.match(prefixRegex);
      const args = message.content
        .slice(matchedPrefix.length)
        .trim()
        .split(/ +/);

      const command_name = args.shift().toLowerCase();
      const command =
        (await message.client.commands.get(command_name)) ||
        (await message.client.commands.find(
          (cmd) => cmd.aliases && cmd.aliases.includes(command_name)
        ));

      if (!command) return;
      if (!cooldowns.has(command.name)) await cooldowns.set(command.name, new Collection());

      const now = Date.now();
      const timestamps = await cooldowns.get(command.name);
      const cooldownAmount = (command.cooldown || 0) * 1000;

      if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          return message.reply({ embeds: [embedContent(`Please wait ${timeLeft.toFixed(1)} second(s) before using the \`${command.name}\` command.`)] });
        }
      }

      timestamps.set(message.author.id, now);
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

      message.data = guildInfo;
      message.command_name = command_name;

      try {
        if (guildInfo) {
          if (guildInfo.Disabled) {
            if (guildInfo.Disabled.includes(command.name))
              return message.reply({ embeds: [embedContent(`${message.author} That command is disabled on this server`)] });
          }
          await command.execute(message, args, message.client);
        }
      } catch (error) {
        console.log("ERROR: " + command.name, error);
        return message.reply({ embeds: [embedContent(`There was an error executing that command, if this error continues please join this server to contact us https://discord.gg/Nvr8hBe9Rr`)] }).catch((err) => { });
      }
    } catch (err) { }
  },
};
