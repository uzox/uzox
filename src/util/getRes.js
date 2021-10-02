module.exports = async (search, player, message) => {
    let res = await player.search(search, message.member.user);
    if (res.loadType === "NO_MATCHES") {
        for (let i = 0; i < 50; i++) {
            res = await player.search(search, message.member.user);
            if (res.loadType !== "NO_MATCHES") break;
        }
    }
    return res;
}
