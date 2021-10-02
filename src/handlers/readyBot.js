const { setServerCount } = require("./serverCount");
const { clearPlayers } = require("../util/clearPlayers");

module.exports = {
  async handleReadyBot(client) {
    try {
      console.log(`${client.commands.size} commands ready.`);
      console.log(`Logged in as ${client.user.tag}`);

      await client.manager.init(client.user.id);
      clearPlayers(client);
      await setServerCount(client);
    } catch (err) { }
  },
};
