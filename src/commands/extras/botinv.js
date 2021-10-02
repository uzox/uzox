const embedMessage = require("../../util/embedContent");

module.exports = {
  name: "botinv",
  aliases: ["binv", "botinvite", "invitebot", "invb", "invite"],
  async execute(message) {
    return message.reply({ embeds: [embedMessage(`Thank you for inviting me into your server!\nhttps://discord.com/oauth2/authorize?client_id=${message.client.user.id}&permissions=8&scope=bot+applications.commands`)] });
  },
};
