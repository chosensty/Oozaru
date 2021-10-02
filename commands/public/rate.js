const { prefix } = require('../../config.json');

module.exports = {
    name: 'rate',
    descriptions: 'gives you a rate',
    help:`\`\`${prefix}rate <user if you'd like> <what you want the rate of>\`\``,
    aliases: [],
    permissions: [],
    cooldown: 2,
    execute(client, message, args, Discord) {
        try{
        if(!args.length) return message.reply('Please specify what you want the rate of!')
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const dice = Math.floor(Math.random()*100)+ 1

        if(!member)  {
            var rate = args.slice(0).join(' ')
            var person = 'You have a'
        } else {
            rate = args.slice(1).join(' ')
            var person = member.displayName+' has a'
        }
        const embed = new Discord.MessageEmbed()
        .setTitle('Rate machine')
        .setDescription(`${person} ${dice}% chance of being ${rate}`)
        .setColor('RANDOM')

        message.channel.send({embeds: [embed]})
    } catch (err) {
        console.error('rate error:', err)
    }
    }

}
