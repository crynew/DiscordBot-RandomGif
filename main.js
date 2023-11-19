const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client({
    intents: [
      Discord.GatewayIntentBits.Guilds,
      Discord.GatewayIntentBits.GuildMessages,
      Discord.GatewayIntentBits.GuildPresences,
      Discord.GatewayIntentBits.GuildMessageReactions,
      Discord.GatewayIntentBits.DirectMessages,
      Discord.GatewayIntentBits.MessageContent,
      Discord.GatewayIntentBits.GuildVoiceStates,
      Discord.GatewayIntentBits.GuildMembers
    ],
    partials: [
     Discord.Partials.Channel,
     Discord.Partials.Message,
     Discord.Partials.User,
     Discord.Partials.GuildMember,
     Discord.Partials.Reaction
    ]
  });

const { REST } = require('@discordjs/rest');
const { Routes } = require("discord-api-types/v10");

const {token} = require("./config.json")
global.client = client;
client.commands = (global.commands = []);

fs.readdir("./comandos/", (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./comandos/${file}`);

        client.commands.push({
            name: props.name.toLowerCase(),
            description: props.description,
            options: props.options,
            type: props.type,
        })
        console.log(`[Slash Menager, Update:] ${props.name}`);
    });
});

fs.readdir("./events/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];

        console.log(`[Events Menager, Update]: ${eventName}`);
        client.on(eventName, (...args) => {
            event(client, ...args);
        });
    });
});

client.on(Discord.Events.Ready, async function () {

    console.log(`[BOT] Conectado: ${client.user.tag} `);
    client.user.setActivity("Discord.gg/bsz | Brunno (@crynew)", { type: "WATCHING" });
    const rest = new REST({ version: "10" }).setToken(token);
    try {
        await rest.put(Routes.applicationCommands(client.user.id), {
            body: commands,
        });

    } catch (error) {
        console.error(error);
    }
});

client.login(token);
