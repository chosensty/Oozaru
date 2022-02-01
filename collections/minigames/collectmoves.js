
const { createMessageComponentCollector } = require('discord.js')
// testing algorithm

module.exports = {

    // buttons is the buttons, msg is the message you want to attach the buttons on
    // time is the amount of time the player has to select a move.
    collect_moves(message, moveCollector, msg, player1, player2) {
        
        return new Promise((resolve, reject) => {
       
        await moveCollector.on('collect', async interaction => {
        
        console.log(player1.currentMove)
        console.log(player2.currentMove)
        if (interaction.user.id === message.author.id) {
            if (interaction.customId === 'forfeit') return message.channel.send(`**${player1.name} has forfeited the match.**`)
            if (player1.currentMove === 'nothing') {
                player1.newMove(interaction.customId)
                if (player2.currentMove === 'nothing') {
                    commentaryMessage = await message.channel.send({ content: `**${message.author.username} has selected his move! waiting on ${member.displayName}...**` })
                } else {
                    commentaryMessage.edit({ content: `**${message.author.username} has now selected his move!**` })
                    moveCollector.stop()
                }
            }
        } else {
            if (interaction.customId === 'forfeit') return message.channel.send(`**${player2.name} has forfeited the match.**`)
            if (player2.currentMove === 'nothing') {
                player2.newMove(interaction.customId)
                if (player1.currentMove === 'nothing') {
                    commentaryMessage = await message.channel.send({ content: `**${member.displayName} has now selected his move! waiting on ${message.author.username}...**` })
                } else {
                    commentaryMessage.edit({ content: `**${member.displayName} has now also selected his move!**` })
                    moveCollector.stop()
                }
            }
        }
        interaction.deferUpdate();

    })
    //once both players have selected their moves.
    await moveCollector.on('end', () => {
        //if no move is selected
        if (player1.currentMove === 'nothing') {
            player1.newMove('nothing')
        }
        if (player2.currentMove === 'nothing') {
            player2.newMove('nothing')
        }
        
        //when the timer finishes or both players have selected a move.
        resolve()
    })

        

    
          
        
        })
        
    }
}
