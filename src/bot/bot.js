const { TOKEN, DEFAULT_PREFIX, MONGODB_URI, LAVALINK_SERVERS, SPOTIFY_API_CONFIG } = require("../../config/config.json");
const { Client, Collection, Intents } = require("discord.js");
const { Manager } = require("erela.js");
const mongoose = require("mongoose");
const SpotifyPlugin = require("erela.js-spotify");
const DeezerPlugin = require("erela.js-deezer");
const cooldowns = new Collection();

const { handleTrackStart } = require("../handlers/trackStart");
const { handleQueueEnd } = require("../handlers/queueEnd");
const { handleReadyBot } = require("../handlers/readyBot");
const { handleNewMessage } = require("../handlers/message");
const { initFiles } = require("../util/initFiles");

const client = new Client({
  restTimeOffset: 10,
  intents: [
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILDS,
  ],
  partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"]
});
client.login(TOKEN);
client.commands = new Collection();
client.slashcmds = new Collection();
client.prefix = DEFAULT_PREFIX;

initFiles(client);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.manager = new Manager({
  nodes: LAVALINK_SERVERS, autoPlay: true,
  send: (id, payload) => {
    const guild = client.guilds.cache.get(id);
    if (guild) guild.shard.send(payload);
  },
  plugins: [
    new SpotifyPlugin({
      clientID: SPOTIFY_API_CONFIG.clientId,
      clientSecret: SPOTIFY_API_CONFIG.clientSecret,
    }),
    new DeezerPlugin(),
  ],
})
  .on("nodeConnect", (node) => console.log(`Node "${node.options.identifier}" Connected.`))
  .on("nodeError", (node, error) => console.log(`Node "${node.options.identifier}" Error: ${error.message}.`))
  .on("nodeError", async (node, err) => console.error(err))
  .on("trackError", async (player, track, err) => console.error(err))
  .on("trackStart", async (player, track) => await handleTrackStart(player, track, client))
  .on("queueEnd", async (player) => await handleQueueEnd(player, client));

client
  .on("warn", console.error)
  .on("error", console.error)
  .on("raw", async (rawData) => await client.manager.updateVoiceState(rawData))
  .on("ready", async () => await handleReadyBot(client))
  .on("messageCreate", async (message) => await handleNewMessage(message, cooldowns))


// NOTE:
// I've added this piece of code coz I was too lazy and had no time to handle all the other errors and 
// from the months of unhandled errors, the bot crashed 3 times, and those
// were handled. The new errors are almost non-existent but for my bot we used this to skip the errors
// DISCLAIMER: THIS CAN BE VERY DANGEROUS AND THE DAMAGE CAN BE UNRECOVERABLE FROM
// I'd advise to not use it, catch the errors and fix them.
process
  .on("uncaughtException", (err) => {
    console.log("UNCAUGHT", err);
  })
  .on("uncaughtExceptionMonitor", (err) => {
    console.log("UNCAUGHT MONITOR", err);
  })
  .on("unhandledRejection", (err) => {
    console.log("UNHANDLED", err);
  });
