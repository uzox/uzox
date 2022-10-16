const DJ = require("../models/dj");

module.exports = async (message) => {
  let role = await DJ.findOne({ GuildID: message.guild.id });
  if (!role?.dj) return true;
  const djrole = message.guild.roles.cache.find((role) => role.id == dadj.id);
  if (!djrole) return false;
  return true;
};
