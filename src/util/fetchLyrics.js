const guessTrack = require("./guessTrack");
const axios = require("axios").default;

module.exports = async (query) => {
    let data = await guessTrack(query),
        track = {
            title: data.track,
            artist: data.artist,
            lyrics: (await axios({ url: `https://api.lyrics.ovh/v1/${data.artist}/${data.track}` })).data.lyrics
        };

    if (!track) return undefined;
    if (!track.lyrics) return undefined;

    return track;
}