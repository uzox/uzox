const Dispatcher = require('./Dispatcher.js');

class MusicQueue extends Map {
    constructor(client, iterable) {
        super(iterable);
        this.client = client;
    }
    async handle(guild, member, channel, node, track) {
        const existing = this.get(guild.id);

        if (!existing) {
            const player = await node.joinChannel({
                guildId: guild.id,
                shardId: guild.shardId,
                channelId: member.voice.channelId,
                deaf: true
            });

            const dispatcher = new Dispatcher({
                client: this.client,
                guild: guild,
                text: channel,
                player
            });

            dispatcher.queue.push(track);
            this.set(guild.id, dispatcher);
            return dispatcher;
        }

        existing.queue.push(track);
        if (!existing.current) await existing.play();
        return null;
    }
}

module.exports = MusicQueue;