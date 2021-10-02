let { prefix } = require('../config.json')
//create cooldowns map
const Discord = require('discord.js');
const fs = require('fs');
const phrases = require('../collections/custom replies.json');
module.exports = {
    name: 'messageCreate',
    execute(client, message) {
        try {
        if(message.author.bot) return;
        // declaring the argument variable and the cmd one.
        const args = message.content.split(/ +/);
        for (keys in phrases) {
            var wordCount = keys.match(/(\w+)/g).length;
            if (keys === args.slice(0, wordCount).join(' ').toLowerCase()) {
                const dice = Math.floor(Math.random()*phrases[keys][1])+1
                if (dice === 1) return message.reply(phrases[keys][0])
            }
        }
                
        } catch(err) {
            console.error('Replies event error: '+err)
        }
    }

}