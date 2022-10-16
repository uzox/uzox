const {
  TOKEN,
  DEFAULT_PREFIX,
  MONGODB_URI
} = require("../../config/config.json");
const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials
} = require("discord.js");

const mongoose = require("mongoose");
const {
  handleReadyBot
} = require("../handlers/readyBot");
const {
  handleNewInteraction
} = require("../handlers/interaction");
const {
  initFiles
} = require("../util/initFiles");

const client = new Client({
  restTimeOffset: 10,
  intents: [
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMessages
  ],
  partials: [Partials.Channel, Partials.GuildMember, Partials.User, Partials.ThreadMember, Partials.Message]
});
client.login(TOKEN);
client.commands = new Collection();
client.prefix = DEFAULT_PREFIX;
client.logger = new (require("../util/logger"))();

initFiles(client);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(res => console.log("Mongoose connected"));

client.manager = new (require("../../structures/Shoukaku"))(client);
client.manager.queue = new (require("../../structures/Queue"))(client);
client
  .on("warn", console.error)
  .on("error", console.error)
  .on("ready", async () => await handleReadyBot(client))
  .on("guildCreate", async (guild) => await handleGuildCreate(guild, client, api))
  .on("guildDelete", async (guild) => await handleGuildDelete(guild, client, api))
  .on("interactionCreate", async (interaction) => await handleNewInteraction(interaction))

process
  .on("uncaughtException", (err) => { })
  .on("uncaughtExceptionMonitor", (err) => { })
  .on("unhandledRejection", (err) => { });