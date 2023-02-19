const { Shoukaku, Connectors } = require("shoukaku");
const chalk = require("chalk");
const config = require('../config/config.json');

class ShoukakuHandler extends Shoukaku {
    constructor(client) {
        super(new Connectors.DiscordJS(client), config.LAVALINK_SERVERS, {
            moveOnDisconnect: true,
            resumable: true,
            resumableTimeout: 3600,
            reconnectTries: 100,
            restTimeout: 10000,
            reconnectInterval: 10000,
            alwaysSendResumeKey: true,
            resumeKey: "a key"
        });

        this.on('ready', (name, resumed) =>
            client.logger.log(`LAVALINK => [STATUS] ${name} successfully connected.`, ` ${resumed ? 'Resumed' : 'New'} connection.`)
        );

        this.on('error', (name, error) => {
            if (!error.toLowerCase().includes("econnrefused")) client.logger.error(chalk.red(`LAVALINK => ${name}: Error Caught.`, error))
        });

        this.on('close', (name, code, reason) =>
            client.logger.log(chalk.redBright(`LAVALINK => ${name}: Closed, Code ${code}`, `Reason ${reason || 'No reason'}.`))
        );

        this.on('disconnect', (name, players, moved) =>
            client.logger.log(chalk.yellowBright(`LAVALINK => ${name}: Disconnected`, moved ? 'players have been moved' : 'players have been disconnected'))
        );
    }
}

module.exports = ShoukakuHandler;
