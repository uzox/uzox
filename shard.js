const { ShardingManager } = require("discord.js");
const config = require("./config/config.json");
const shards = new ShardingManager("./src/bot/bot.js", {
  token: config.TOKEN,
  totalShards: "auto",
});

shards.on("shardCreate", (shard) => {
  console.log(`[${new Date().toString().split(" ", 5).join(" ")}] Launched shard ${shard.id}`);
});

shards.spawn({ timeout: 360000, delay: 1 });
