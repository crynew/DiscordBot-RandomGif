const { Client, EmbedBuilder } = require("discord.js");
const axios = require("axios");
const c = require("../config.json");

module.exports = async (client) => {
  const servidor = client.guilds.cache.get(c.guild);

  if (!client.guilds.cache.get(c.guild)) return;

  setInterval(() => {

    let randomUser = client.users.cache.filter(a => !a.bot).filter(a => a.avatarURL({ dynamic: true })).random();

    axios
      .get(`https://discord.com/api/users/${randomUser.id}`, {
        headers: {
          Authorization: "Bot " + client.token,
        },
      })
      .then((res) => {
        if (res.data.banner) {
          if (!client.channels.cache.get(c.banner)) return;

          const embedBannerGif = new EmbedBuilder()
          .setAuthor({ name: servidor.name, iconURL: servidor.iconURL({ dynamic: true }) || undefined, })
          .setColor("#ffffff")
          .setFooter({ text: `${randomUser.globalName ? randomUser.globalName: `${randomUser.username}`}/${randomUser.username} (${randomUser.id})`  })
          .setImage(`https://cdn.discordapp.com/banners/${randomUser.id}/${res.data.banner}.gif?size=2048`)

          if (res.data.banner.startsWith("a_")) {
            client.guilds?.cache
              ?.get(c.guild)
              ?.channels?.cache
              ?.get(c.banner)
              ?.send({
                embeds: [embedBannerGif],
              });
          } else {

            const embedBanner = new EmbedBuilder()
            .setAuthor({ name: servidor.name, iconURL: servidor.iconURL({ dynamic: true }) || undefined, })
            .setColor("#ffffff")
            .setFooter({ text: `${randomUser.globalName ? randomUser.globalName: `${randomUser.username}`}/${randomUser.username} (${randomUser.id})` })
            .setImage(`https://cdn.discordapp.com/banners/${randomUser.id}/${res.data.banner}.png?size=2048`)

            client.guilds?.cache
              ?.get(c.guild)
              ?.channels?.cache
              ?.get(c.banner)
              ?.send({
                embeds: [embedBanner],
              });
          }
        }
      })
      .catch(() => {});

    if (randomUser.avatarURL({ dynamic: true, size: 1024 }).split("?")[0].endsWith(".gif")) {
      if (!client.channels.cache.get(c.gif)) return;

      const embedGif = new EmbedBuilder()
        .setAuthor({ name: servidor.name, iconURL: servidor.iconURL({ dynamic: true }) || undefined, })
        .setColor("#ffffff")
        .setFooter({ text: `${randomUser.globalName ? randomUser.globalName: `${randomUser.username}`}/${randomUser.username} (${randomUser.id})`  })
        .setImage(randomUser.avatarURL({ dynamic: true, size: 1024 }));

      client.guilds?.cache
        ?.get(c.guild)
        ?.channels?.cache
        ?.get(c.gif)
        ?.send({
          embeds: [embedGif],
        });
    } else {
      if (!client.channels.cache.get(c.icon)) return;

      const embedIcon = new EmbedBuilder()
      .setAuthor({ name: servidor.name, iconURL: servidor.iconURL({ dynamic: true }) || undefined, })
      .setColor("#ffffff")
      .setFooter({ text: `${randomUser.globalName ? randomUser.globalName: `${randomUser.username}`}/${randomUser.username} (${randomUser.id})` })
      .setImage(randomUser.avatarURL({ dynamic: true, size: 1024 }))
  
      client.guilds?.cache
        ?.get(c.guild)
        ?.channels?.cache
        ?.get(c.icon)
        ?.send({
          embeds: [embedIcon],
        });
    }
  }, 5 * 1000);
};
