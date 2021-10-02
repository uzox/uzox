const addArray = (arr) => arr.reduce((a, b) => a + b, 0);

module.exports = {
  async setServerCount(client) {
    try {
      setInterval(async () => await setServerCount(client), 30000);

      async function setServerCount(client) {
        await client.shard
          .broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0))
          .then(async (res) => { client.memberCount = addArray(res) })
        await client.shard
          .fetchClientValues('guilds.cache.size')
          .then(async (res) => { client.serverCount = addArray(res) })

        if (client.serverCount) await client.user.setActivity(`music | ${client.serverCount} servers | ${client.memberCount} users`, { type: "LISTENING" })
      }
    } catch (err) { }
  },
};
