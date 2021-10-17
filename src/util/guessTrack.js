const axios = require("axios").default;

const guessTrack = async (query) => {
    query = query.replace(/\(.*\)/g, '');
    query = query.replace(/\[.*\]/g, '');
    query = query.replace(/lyric(s?)|parole(s?)/gi, '');
    query = query.replace(/^'/, '');
    query = query.replace(/ '/g, ' ');
    query = query.replace(/' /g, ' ');
    query = query.replace(/Original Motion Picture Soundtrack/i, '');
    query = query.replace(/bande originale/i, '');

    const { data } = await axios({
        url: 'https://itunes.apple.com/search?media=music&limit=1&term=' + encodeURIComponent(query),
        responseType: "json",
        method: "get"
    })

    return { track: data.results[0].trackName, artist: data.results[0].artistName };
};

module.exports = guessTrack;