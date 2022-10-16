const { setServerCount } = require("./serverCount");
const updateSlash = require("../util/updateSlash")

module.exports = {
  async handleReadyBot(client) {
    await updateSlash(client);

    console.log(`Logged in as ${client.user.tag} on Shard ID ${client.guilds.cache.first().shardId}`);

    await setServerCount(client);
  },
};
