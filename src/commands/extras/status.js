const os = require("os");
const embedMessage = require("../../util/embedContent");
const humanize = require("humanize-duration");

module.exports = {
  name: "status",
  cooldown: 10,
  async execute(message, args) {
    try {
      const messembed = embedMessage()
        .addField("Channels", `${message.client.channels.cache.size.toLocaleString()}`, true)
        .addField("CPU Cores: ", `${os.cpus().length}`, true)
        .addField("CPU Usage: ", `${(os.cpus()[0].speed / 1000).toFixed(1)}`, true)
        .addField("RAM: ", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
        .addField("Uptime: ", humanize(Math.round(process.uptime() * 1000)), true);

      message.reply({ embeds: [messembed] });
    } catch (err) {
      console.log(err)
    }
  },
};
