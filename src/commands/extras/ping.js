const embedMessage = require("../../util/embedContent");

module.exports = {
  name: "ping",
  async execute(message) {
    const client = message.client;
    const messembed = embedMessage()
      .addField(
        "Message Latency",
        `${Date.now() - message.createdTimestamp} ms.`
      )
      .addField("Websocket Latency", String(Math.round(client.ws.ping)) + "ms.")
      .setTitle("🏓Pong!");
    return message.reply({embeds: [messembed]});
  },
};
