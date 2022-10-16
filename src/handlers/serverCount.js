const { ActivityType } = require("discord.js");

const addArray = (arr) => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++)    sum += arr[i];
  return sum;
}

module.exports = {
  async setServerCount(client) {
    try {
      await client.shard
        .broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0))
        .then(async (res) => { client.memberCount = addArray(res) })
      await client.shard
        .fetchClientValues('guilds.cache.size')
        .then(async (res) => { client.serverCount = addArray(res) })

      if (client.serverCount) await client.user.setActivity(`music | ${client.serverCount} servers | ${client.memberCount} users | shard ${client.shard.count}`, { type: "LISTENING" })

      setInterval(async () => await setServerCount(client), 30000);

      async function setServerCount(client) {
        await client.shard
          .broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0))
          .then(async (res) => { client.memberCount = addArray(res) })
        await client.shard
          .fetchClientValues('guilds.cache.size')
          .then(async (res) => { client.serverCount = addArray(res) })

        if (client.serverCount) await client.user.setActivity(`music | ${client.serverCount} servers | ${client.memberCount} users | shard ${client.shard.count}`, { type: ActivityType.Listening })
      }
    } catch (err) { }
  },
};
