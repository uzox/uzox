const chalk = require('chalk');

module.exports = class logger {
    error(error) {
        console.error(error);
    }

    debug(name, content) {
        console.log(chalk.green(`[${name ? name : 'Unknown'}] ${content}`));
    }

    eventDebug(name, content) {
        console.log(`[${name ? name : 'Unknown'}] ${content}`);
    }

    log(name, content) {
        console.log(chalk.green(`[${name}] ${content}`));
    }
};