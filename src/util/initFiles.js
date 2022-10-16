const {readdirSync} = require("fs");
const {join} = require("path");

module.exports = {
    initFiles(client) {
        const musicCommandFiles = readdirSync(
            join(__dirname, "../commands/music")
        ).filter((file) => file.endsWith(".js"));
        for (const file of musicCommandFiles) {
            const command = require(join(__dirname, "../commands/music", `${file}`));
            client.commands.set(command.name, command);
        }

        const settingsCommandFiles = readdirSync(
            join(__dirname, "../commands/settings")
        ).filter((file) => file.endsWith(".js"));
        for (const file of settingsCommandFiles) {
            const command = require(join(__dirname, "../commands/settings", `${file}`));
            client.commands.set(command.name, command);
        }
    },
}