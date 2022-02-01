const { prefix } = require('../../config.json');
const { Player, moveWinner, bars } = require('../../collections/minigames/duelsfuns')
const { MessageButton, MessageActionRow } = require('discord.js');
const { request } = require('../../collections/requestcheck')
const { duelImage } = require('../../collections/minigames/duelsimage.js')
const { collect_moves } = require('../../collections/minigames/collectmoves.js')
module.exports = {
    name: 'duel',
    description: 'duel another player',
    help: `\`\`${prefix}duel <the user that you'd like to duel\`\``,
    aliases: ['1v1', 'vs', 'verse'],
    permissions: [],
    cooldown: 10,
    async execute(client, message, args, Discord) {
        try {
            // if there are no arguments given
            if (!args.length) return message.reply(`Please enter a user that you'd like to duel.`);
            if (args[0] === 'guide') {

            }

            //getting the member
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if (member.id === message.author.id) return message.reply('You can\'t duel your self.')
            // a few validation checks
            if (!member) return message.reply('Please enter a valid user to duel.');

            
            // duel request function here
                const response = await request(message, member)
                if(!response) return

                //setting the two instances for the class.
                var player1 = new Player(message.author.username, 0)
                var player2 = new Player(member.displayName, 1)

                //making the image
                const attachment = await duelImage(message, member)


                //simple initialisationg
                healthbar = '🟩'
                powerbar = '🟦'

                // setting up an embed
                const attackButton = new MessageButton()
                    .setCustomId('attack')
                    .setLabel('👊 attack')
                    .setDisabled(false)
                    .setStyle('SECONDARY')

                const dodgeButton = new MessageButton()
                    .setCustomId('dodge')
                    .setLabel('🏃‍♂️ dodge')
                    .setDisabled(false)
                    .setStyle('SECONDARY')

                const guardButton = new MessageButton()
                    .setCustomId('guard')
                    .setLabel('🛡️ guard')
                    .setDisabled(false)
                    .setStyle('SECONDARY')

                const elementButton = new MessageButton()
                    .setCustomId('element')
                    .setLabel('💠 elemental power')
                    .setDisabled(false)
                    .setStyle('SUCCESS')


                var buttonMoveRow = new MessageActionRow()
                    .addComponents(
                        attackButton,
                        dodgeButton,
                        guardButton,
                        elementButton
                    )

                const forfeitButton = new MessageButton()
                    .setCustomId('forfeit')
                    .setLabel('😬 forfeit')
                    .setStyle('DANGER')
                    .setDisabled(false)

                const drawButton = new MessageButton()
                    .setCustomId('draw')
                    .setLabel('🤝 offer draw')
                    .setDisabled(false)
                    .setStyle('PRIMARY')

                var buttonForfeitRow = new MessageActionRow()
                    .addComponents(
                        forfeitButton,
                        drawButton
                    )


                // a function to disable or enable all of the buttons.
                const buttonDisable = function (status) {
                    buttonMoveRow.components.forEach((buttons) => buttons.disabled = status)
                    buttonForfeitRow.components.forEach((buttons) => buttons.disabled = status)
                }

                //information on the player which will be on the embed.
                const playerInfo = function (player) {
                    return `**Health: ${player.hp}\n${bars(healthbar, player.hp)}\nPower: ${player.pp}\n${bars(powerbar, player.pp)}\nElemental power: ${player.element}**`
                }


                //information on the player used on the round log.
                const playerLogInfo = function (player, roundWinner) {
                    return `**Selected move: ${player.currentMove}\nCurrent Health: ${player.hp} [${player.logStringify(player.hpDiff[player.moveCount])}]\nCurrent power: ${player.pp} [${player.logStringify(player.ppDiff[player.moveCount])}]\n Round Winner: ${roundWinner}**`
                }



                //adding an array containing all the buttons to control them all simultaneously.

                //the embed signifying the start of the duel.
                let embed = new Discord.MessageEmbed()
                    .setTitle(`A duel between ${message.author.username} and ${member.displayName} has begun!`)
                    .addFields(
                        {
                            name: `${player1.name}`,
                            value: playerInfo(player1)
                            , inline: true
                        },
                        {
                            name: `${player2.name}`,
                            value: playerInfo(player2)
                            , inline: true
                        }
                    )
                    .setImage('attachment://duel.png')
                    .setFooter('You have 30 seconds to make a move! remember once you\'ve selected a move there\'s no going back...')
                // sending a message and storing it in a variable for reactions.
                var duelEmbed = await message.channel.send({ embeds: [embed], files: [attachment], components: [buttonMoveRow, buttonForfeitRow] });
                const moveFilter = i => i.user.id === member.id || i.user.id === message.author.id
                const moveCollector = duelEmbed.createMessageComponentCollector({ moveFilter, time: 30000 })
                let commentaryMessage, duelEnd

                game_function = async function () {


                //using promises so that parts of the code only executed in the correct order.

                //getting both of the players moves.
                buttonDisable(false)

                let get_moves = await collect_moves(message, moveCollector, commentaryMessage, player1, player2)



                buttonDisable(true)
                

                duelEmbed.edit({ embeds: [embed], files: [attachment], components: [buttonMoveRow, buttonForfeitRow] })


                //once the both players have selected their move, the move simulation function is activated
                const moveSimulation = await moveWinner(player1, player2)

                setTimeout(async () => {


                    //just a quick validation check
                    if (!moveSimulation) return message.channel.send('**Duel error ocurred. Sorry for the inconvenience.**');


                    //sending the speech of the move to the discord server.
                    var moveSpeech = await `**${moveSimulation[1]}**`
                    commentaryMessage.edit({ content: moveSpeech })


                    console.log(moveSimulation[0])


                    //re-initialising the player objects
                    player1 = moveSimulation[0][0]
                    player2 = moveSimulation[0][1]





                    //sending the commentary message to discord, then a few seconds after sending the log for that duel round.
                    setTimeout(async () => {

                        //checking if there is a winner.
                        if (player1.hp === 0 || player2.hp === 0) {
                            duelEnd = duelEnd()
                            duelStatus = false
                        }


                        var testEmbed = await new Discord.MessageEmbed()
                            .setTitle(`Round ${moveCount} summary`)
                            .addFields(
                                {
                                    name: `**${player1.name}**`,
                                    value: playerLogInfo(player1, moveSimulation[2]),
                                    inline: true
                                },
                                {
                                    name: `**${player2.name}**`,
                                    value: playerLogInfo(player2, moveSimulation[2]),
                                    inline: true
                                }
                            )
                        await commentaryMessage.edit({ embeds: [testEmbed] })


                        //starting the next round or ending the duel if it's finished.
                        setTimeout(async () => {
                            player1.reset()
                            player2.reset()
                            await commentaryMessage.edit({ embeds: [], content: `**Starting a new round...**` })
                            game_function()
                        }, 7000)
                    }, 10000)

                }, 2000)


        }

                     

} catch (err) {
    console.error(`duels error: ${err}`)
}
    }
}
