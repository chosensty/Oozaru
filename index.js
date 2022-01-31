// initialising the discord module and the client object.
try{
const Discord = require('discord.js');
const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION" ], intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES', 'GUILD_MESSAGE_REACTIONS']});

//requiring the global variable for the token.
const envVars = require('./config.json')

// loads up the commands and event handlers.
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})

//logs into the bot
client.login(envVars.token);
}catch (err) {
    console.log(err)
  } 
