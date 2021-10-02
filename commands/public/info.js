const { prefix } = require('../../config.json');
const moment = require('moment');

module.exports = {
    name:'info',
    description:'sends info on the user',
    aliases:['i', 'information'],
    permissions:[],
    help:`\`\`${prefix}info <user you want the info of>\`\``,
    execute(client, message, args, Discord) {
        const embed = new Discord.MessageEmbed()
        .setTitle('User Information')
        .setColor('RANDOM') // or .setColor('RANDOM')   )
        .setFooter('Anime House Bot')
        if(!args.length) {
            embed.addField('Username', `<@${message.author.id}>`)
            embed.addField('Server nickname', `${message.member.displayName}`)
            embed.addField('Account created', `${moment(message.member.user.createdAt).format('LLLL')}`)
            embed.addField('Joined server', `${moment(message.member.joinedAt).format('LLLL')}`)                  
            embed.addField('Id', `${message.author.id}`)
            embed.setThumbnail(message.author.displayAvatarURL({dynamic : true}))
        } else {
            userinfo = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            if(!userinfo) return message.reply('Please enter a valid user that you\'d like to get the information of.\n'+this.help)
            embed.addField('Username', `<@${userinfo.id}>`)
            embed.addField('Server nickname', `${userinfo.displayName}`)
            embed.addField('Account created', `${moment(userinfo.user.createdAt).format('LLLL')}`)
            embed.addField('Joined server', `${moment(userinfo.joinedAt).format('LLLL')}`)                  
            embed.addField('Id', `${userinfo.id}`)
            embed.setThumbnail(userinfo.user.displayAvatarURL({dynamic : true}))
        }
        message.channel.send({embeds: [embed]})
        
    }
}