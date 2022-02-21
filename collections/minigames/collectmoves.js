
// testing algorithm

module.exports = {

    // buttons is the buttons, msg is the message you want to attach the buttons on
    // time is the amount of time the player has to select a move.
    collect_moves_duels: function (duelEmbed, player1, player2) {

        const moveFilter = i => i.user.id === player2.player_info.id || i.user.id === player1.player_info.author.id
        const moveCollector = duelEmbed.createMessageComponentCollector({ moveFilter, time: 30000 })


        return new Promise(async (resolve, reject) => {
            let move1 = 'nothing'
            let move2 = 'nothing'

            await moveCollector.on('collect', async (interaction) => {


                if (interaction.user.id === player1.player_info.author.id) {
                    if (interaction.customId === 'forfeit') reject(player1.player_info.channel.send(`**${player1.name} has forfeited the match.**`))
                    if (move1 === 'nothing') {
                        move1 = interaction.customId
                        if (move2 === 'nothing') {
                            duelEmbed.edit({ content: `**${player1.name} has selected his move! waiting on ${player2.name}...**` })
                        } else {
                            duelEmbed.edit({ content: `**${player1.name} has now selected his move!**` })
                            moveCollector.stop()
                        }
                    }
                } else {
                    if (interaction.customId === 'forfeit') reject(player1.player_info.channel.send(`**${player2.name} has forfeited the match.**`))
                    if (move2 === 'nothing') {
                        move2 = interaction.customId
                        if (move1 === 'nothing') {
                            duelEmbed.edit({ content: `**${player2.name} has now selected his move! waiting on ${player1.name}...**` })
                        } else {
                            duelEmbed.edit({ content: `**${player2.name} has now also selected his move!**` })
                            moveCollector.stop()
                        }
                    }
                }
                interaction.deferUpdate();

            })
            //once both players have selected their moves.
            await moveCollector.on('end', () => {
                //if no move is selected
                if (move1 === 'nothing') {
                    move1 = 'nothing'
                }
                if (move2 === 'nothing') {
                    move2 = 'nothing'
                }
                setTimeout(() => {
                    resolve([move1, move2])
                }, 1500)

                //when the timer finishes or both players have selected a move.

            })






        })

    },
    collect_moves_rps: function (rps_msg, player1, player2) {
        const moveFilter = i => i.user.id === player2.player_info.id || i.user.id === player1.player_info.author.id
        const moveCollector = rps_msg.createMessageComponentCollector({ moveFilter, time: 10000 })

        return new Promise(async (res, rej) => {
            let notifier
            let move1 = 'nothing'
            let move2 = 'nothing'

            await moveCollector.on('collect', async (interaction) => {


                if (interaction.user.id === player1.player_info.author.id) {
                    if (interaction.customId === 'forfeit') reject(player1.player_info.channel.send(`**${player1.name} has forfeited the match.**`))
                    if (move1 === 'nothing') {
                        move1 = interaction.customId
                        if (move2 === 'nothing') {
                            rps_msg.edit({ content: `**${player1.name} has selected his move! waiting on ${player2.name}...**` })
                        } else {
                            rps_msg.edit({ content: `**${player1.name} has now selected his move!**` })
                            moveCollector.stop()
                        }
                    }
                } else {
                    if (interaction.customId === 'forfeit') reject(player1.player_info.channel.send(`**${player2.name} has forfeited the match.**`))
                    if (move2 === 'nothing') {
                        move2 = interaction.customId
                        if (move1 === 'nothing') {
                            rps_msg.edit({ content: `**${player2.name} has now selected his move! waiting on ${player1.name}...**` })
                        } else {
                            rps_msg.edit({ content: `**${player2.name} has now also selected his move!**` })
                            moveCollector.stop()
                        }
                    }
                }
                interaction.deferUpdate();

            })
            //once both players have selected their moves.
            await moveCollector.on('end', () => {
                //if no move is selected
                if (move1 === 'nothing') {
                    move1 = 'nothing'
                }
                if (move2 === 'nothing') {
                    move2 = 'nothing'
                }
                setTimeout(() => {
                    res([move1, move2])
                }, 1500)

                //when the timer finishes or both players have selected a move.

            })
        })

    }
}
