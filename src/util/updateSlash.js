const { ApplicationCommandOptionType, ApplicationCommandType } = require("discord.js")

module.exports = async (client) => {
    await client.application.commands.set([
        { name: "nowplaying", description: "Get information about the current track", type: ApplicationCommandType.ChatInput },
        { name: "pause", description: "Pause the queue", type: ApplicationCommandType.ChatInput },
        { name: "previous", description: "Play the previous track", type: ApplicationCommandType.ChatInput },
        { name: "resume", description: "Resume the queue", type: ApplicationCommandType.ChatInput },
        { name: "shuffle", description: "Shuffle the queue", type: ApplicationCommandType.ChatInput },
        { name: "skip", description: "Skip the current track", type: ApplicationCommandType.ChatInput },
        { name: "stop", description: "Disconnect the bot from the voice channel", type: ApplicationCommandType.ChatInput },
        { name: "help", description: "Show all the commands of the bot to use", type: ApplicationCommandType.ChatInput },
        { name: "removedefaultchannel", description: "Remove the default text channel configuration to respond everywhere", type: ApplicationCommandType.ChatInput },
        { name: "removeduplicates", description: "Remove all duplicate tracks from the queue", type: ApplicationCommandType.ChatInput },
        {
            name: "setdefaultchannel", description: "Configure a default text channel to respond in", type: ApplicationCommandType.ChatInput,
            options: [
                { name: "channel", description: "Channel to set", type: ApplicationCommandOptionType.Channel, required: true }]
        }, {
            name: "forward", description: "Seek forward into the track", type: ApplicationCommandType.ChatInput,
            options: [
                { name: "seconds", type: ApplicationCommandOptionType.Integer, description: "Time in seconds to forward into the track", required: true }]
        }, {
            name: "jump", description: "Play a track from the queue without skipping any other tracks", type: ApplicationCommandType.ChatInput,
            options: [
                { name: "position", type: ApplicationCommandOptionType.Integer, description: "Position of the track you want to jump to", required: true }]
        }, {
            name: "play", description: "Play a track", type: ApplicationCommandType.ChatInput,
            options: [
                { name: "query", type: ApplicationCommandOptionType.String, description: "Name or URL of track to play", required: true }]
        }, {
            name: "playfile", description: "Play an MP3 file", type: ApplicationCommandType.ChatInput,
            options: [
                { name: "file", type: ApplicationCommandOptionType.Attachment, description: "Upload an MP3 to play", required: true }]
        }, {
            name: "playnext", description: "Play a track in the next position of the queue", type: ApplicationCommandType.ChatInput,
            options: [
                { name: "query", type: ApplicationCommandOptionType.String, description: "Name or URL of track to play", required: true }]
        }, {
            name: "queue", description: "Show the queue for this server", type: ApplicationCommandType.ChatInput,
            options: [
                { name: "page", type: ApplicationCommandOptionType.Integer, description: "Page number of the queue to display" }]
        }, {
            name: "remove", description: "Remove a track from the queue", type: ApplicationCommandType.ChatInput,
            options: [
                { name: "position", type: ApplicationCommandOptionType.Integer, description: "Position of track to remove", required: true }]
        }, {
            name: "search", description: "Search and play a track", type: ApplicationCommandType.ChatInput,
            options: [
                { name: "query", type: ApplicationCommandOptionType.String, description: "Name of track to search for", required: true }]
        }, {
            name: "seek", description: "Seek to a position into the track", type: ApplicationCommandType.ChatInput,
            options: [
                { name: "position", type: ApplicationCommandOptionType.String, description: "Timestamp to seek to", required: true }]
        }, {
            name: "skipto", description: "Skip all queued tracks until a position", type: ApplicationCommandType.ChatInput,
            options: [
                { name: "position", type: ApplicationCommandOptionType.String, description: "Position of track to skip to", required: true }]
        }, {
            name: "volume", description: "Change or view the volume of the track", type: ApplicationCommandType.ChatInput,
            options: [
                { name: "volume", type: ApplicationCommandOptionType.Integer, description: "Volume to set the track to", required: false }]
        }, {
            name: "move", description: "Move a track to another position in the queue", type: ApplicationCommandType.ChatInput,
            options: [
                { name: "position", type: ApplicationCommandOptionType.Integer, description: "Position of the track", required: true },
                { name: "destination", type: ApplicationCommandOptionType.Integer, description: "Position to move to", required: true }]
        }, {
            name: "loop", description: "Loop the current track or queue", type: ApplicationCommandType.ChatInput,
            options: [
                {
                    name: "type", type: ApplicationCommandOptionType.String, description: "Loop the track or queue", required: true,
                    choices: [
                        { name: "track", value: "track", },
                        { name: "queue", value: "queue" }]
                }]
        }, {
            name: "lyrics", description: "Get the lyrics of a track", type: ApplicationCommandType.ChatInput,
            options: [
                { name: "name", type: ApplicationCommandOptionType.String, description: "Name of the song to fetch lyrics" }]
        }])
}
