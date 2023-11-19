const { EmbedBuilder } = require("discord.js");
module.exports = {
    name: "Ping",
    description: 'Veja a latencia do Bot',
    options: [],
    run: async (client, interaction) => {

        const embed = new EmbedBuilder()
            .setTitle(":ping_pong: Pong!")
            .setDescription(`Ping do Bot: ${client.ws.ping}ms!`)

        if (client.ws.ping < 60) embed.setColor("GREEN")
        else if (client.ws.ping > 60 && client.ws.ping < 120) embed.setColor("YELLOW")
        else if (client.ws.ping > 120) embed.setColor("RED")


        interaction.reply({ embeds: [embed] });

    }
};