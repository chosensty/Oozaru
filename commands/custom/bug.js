const { prefix } = require('../../config.json');
const fs = require('fs');
module.exports = {
    name: 'bug',
    description: 'report a bug in the bot',
    aliases: ['glitch'],
    permissions: [],
    help: `\`\`${prefix}bug <bug>\`\``,
    cooldown: 10,
    execute (client, message, args) {
        if(!args.length) return message.reply('Specify which bug you are reporting.')
        let bug = `\n${message.author.tag} has reported: ${args.join(' ')}`
        fs.appendFileSync('./collections/bugs.txt', bug, function(err) {
            if (err) console.log(err);  
        })
        message.channel.send('bug has been reported.')
        
    }
}
