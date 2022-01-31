const Discord = require('discord.js')
const Canvas = require('canvas')
module.exports = {
    duelImage: async function (message, member) {
        const canvas = Canvas.createCanvas(640, 360);

        const ctx = canvas.getContext('2d');

        const background = await Canvas.loadImage('./collections/images/valley of the end.png')
        // drawing the background
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        const user1Av = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg' }))
        //drawing the avatars
        ctx.drawImage(user1Av, 100, 20, 80, 80)

        const user2Av = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }))

        ctx.drawImage(user2Av, 470, 20, 80, 80)
        //getting the attachment files
        return new Discord.MessageAttachment(canvas.toBuffer(), 'duel.png');

    }
}