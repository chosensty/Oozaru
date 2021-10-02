let { prefix } = require('../config.json')
//create cooldowns map
const cooldowns = new Map();
const Discord = require('discord.js');
const fs = require('fs');
module.exports = {
    name: 'messageCreate',
    execute(client, message) {
    try{
    if(!message.content.toUpperCase().startsWith(prefix) || message.author.bot) return;
    // declaring the argument variable and the cmd one.
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    // declaring the command variable for the message sent
    const command = client.commands.get(cmd) || client.commands.find(a =>a.aliases && a.aliases.includes(cmd));
    
    // permissions array
    const validPermissions = [
        "CREATE_INSTANT_INVITE",
        "KICK_MEMBERS",
        "BAN_MEMBERS",
        "ADMINISTRATOR",
        "MANAGE_CHANNELS",
        "MANAGE_GUILD",
        "ADD_REACTIONS",
        "VIEW_AUDIT_LOG",
        "PRIORITY_SPEAKER",
        "STREAM",
        "VIEW_CHANNEL",
        "SEND_MESSAGES",
        "SEND_TTS_MESSAGES",
        "MANAGE_MESSAGES",
        "EMBED_LINKS",
        "ATTACH_FILES",
        "READ_MESSAGE_HISTORY",
        "MENTION_EVERYONE",
        "USE_EXTERNAL_EMOJIS",
        "VIEW_GUILD_INSIGHTS",
        "CONNECT",
        "SPEAK",
        "MUTE_MEMBERS",
        "DEAFEN_MEMBERS",
        "MOVE_MEMBERS",
        "USE_VAD",
        "CHANGE_NICKNAME",
        "MANAGE_NICKNAMES",
        "MANAGE_ROLES",
        "MANAGE_WEBHOOKS",
        "MANAGE_EMOJIS",
    ]    

    // validating if the command doesn't exist.
    if (!command) return message.channel.send('Invalid command')
    
    //checking if the command permissions exists.
    if(command.permissions.length){
      
      //initialising the valid perms array
      let invalidPerms = []

      //if you don't have the right permissions this is executed.
      for(const perm of command.permissions){
        if(!validPermissions.includes(perm)){
          return console.log(`Invalid Permissions ${perm}`)
        }
        //if permissions array doesn't exist this is executed.
        if(!message.member.permissions.has(perm)){
          invalidPerms.push(perm);
        }
      //if the permission is missing this is executed.
      }
      if (invalidPerms.length){
        return message.channel.send(`Missing Permissions: \`${invalidPerms}\``);
      } 
    }
    // cooldowns >>
    if (!cooldowns.has(command.name)){
      cooldowns.set(command.name, new Discord.Collection());
    }

    //initialising all the time based variables.
    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.name);
    const cooldown_amount = (command.cooldown) * 1000;

    //cooldown condition
    if(time_stamps.has(message.author.id)){
      // gets the expiration time of that users command.
      const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;
      if(!message.author.id !== '283632010378084376'){

      } else {
      if (current_time < expiration_time){
          //setting the time left variable.
          const time_left = (expiration_time - current_time) / 1000;

          //let's you know how long you have left until you can use that command then deletes the message.
          return message.reply(`Please wait ${time_left.toFixed(1)} more seconds before using ${command.name}`).then(msg => (msg.delete({timeout: time_left*1000})));
      }
        }
    }
  // sets a timestamp for the user
  time_stamps.set(message.author.id, current_time);

  //deletes cooldown message after cooldown ends
  // setTimeout(()=> time_stamps.delete(message.author.id), cooldown_amount);


  //executes the command.
  try{
  if(command) command.execute(client, message, args, Discord);
  } catch(err) {
    console.log(err)
  }
}catch (err) {
  console.error('message error: '+err)
} 
    }

}