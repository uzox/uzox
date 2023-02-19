const { nowPlaying } = require("../src/util/nowPlaying");

class MusicDispatcher {
    constructor(options) {
        this.client = options.client;
        this.guild = options.guild;
        this.text = options.text;
        this.player = options.player;
        this.queue = [];
        this.current = null;
        this.previous = null;
        this.end = false;
        this.repeat = 0;

        this.player
            .on('start', async () => {
                this.player.volume = 1;
                try {
                    this.player.playingMessage = await this.text.send((await nowPlaying(this.current, this.client)))
                } catch (err) { }

                if (this.guild.me.voice.channel.type == "GUILD_STAGE_VOICE") {
                    try {
                        await this.guild.me.voice.setSuppressed(false);
                    } catch (err) { }
                }
            })
            .on('end', async () => {
                await this.player.playingMessage.delete().catch((err) => { });

                this.previous = this.current;
                this.current = null;
                if (this.repeat === 1) this.queue.unshift(this.previous);
                else if (this.repeat === 2) this.queue.push(this.previous);

                if (!this.queue[0]?.track && this.queue[0]?.info?.uri) {
                    const requester = this.queue[0].info.requester;
                    this.queue[0] = (await ((await this.client.manager.getNode()).rest.resolve(this.queue[0].info.uri))).tracks[0]
                    this.queue[0].info.requester = requester;
                }

                await this.play();
            })
            .on('exception', (exception) => {
                this.client.logger.debug('TrackException', exception.error);
            })
            .on('error', console.error);

        for (const event of ['closed', 'error']) {
            this.player.on(event, async (data) => {
                if (data instanceof Error || data instanceof Object) this.client.logger.error(data);
                this.queue.length = 0;
                await this.destroy();
            });
        }
    }

    get exists() {
        return this.client.manager.queue.has(this.guild.id);
    }

    async play() {
        if (!this.exists || !this.queue.length) return await this.destroy();
        this.current = this.queue.shift();
        await this.player.playTrack({ track: this.current.track });
    }

    async pause() {
        if (!this.player) return;
        if (!this.player.paused) await this.player.setPaused(true);
    }

    async resume() {
        if (!this.player) return;
        if (this.player.paused) await this.player.setPaused(false);
    }

    async skip(skipto = 1) {
        if (!this.player) return;
        if (skipto > 1) {
            this.queue.unshift(this.queue[skipto - 1]);
            this.queue.splice(skipto, 1);
        }
        this.repeat = this.repeat == 1 ? 0 : this.repeat
        await this.player.stopTrack();
    }

    async stop() {
        if (!this.player) return;
        this.queue.length = 0;
        this.repeat = 0;
        await this.player.stopTrack();
    }

    async destroy() {
        await this.stop();
        await this.player.connection.disconnect();
        await this.client.manager.queue.delete(this.guild.id);
        if (this.end) return;
    }
}

module.exports = MusicDispatcher;
