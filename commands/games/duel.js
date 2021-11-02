const { prefix } = require('../../config.json');
const Canvas = require('canvas');
const { elementFun, moveWinner, bars, duelEnd } = require('../../collections/minigames/duelsfuns')
const Probability = require('probability-node')
const Chance = require('chance');
const { ReactionEmoji, ReactionCollector, MessageButton, MessageActionRow } = require('discord.js');
const { resolve } = require('path/posix');
const chance = new Chance()
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
            if (!args.length) return message.reply('Please enter a user that you\'d like to duel.');
            if (args[0] === 'guide') {

            }

            //getting the member
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if (member.id === message.author.id) return message.reply('You can\'t duel your self.')
            // a few validation checks
            if (!member) return message.reply('Please enter a valid user to duel.');

            // duel acceptance buttons
            const responseButtons = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('yes')
                        .setLabel('✅')
                        .setStyle('SUCCESS'),
                    new MessageButton()
                        .setCustomId('no')
                        .setLabel('❌')
                        .setStyle('DANGER'),
                )

            new Promise(async (resolve, reject) => {
                const responseFilter = i => i.user.id === member.id
                const requestMsg = await message.channel.send({ content: `<@${member.id}> You have been challenged to a duel by <@${message.author.id}>!**\n\n\`\`\`Click '✅' to accept or '❌' to decline\`\`\`**`, components: [responseButtons] })
                const responseCollector = requestMsg.createMessageComponentCollector({ responseFilter, time: 60000 });

                // collects the answers for 

                responseCollector.on('collect', interaction => {
                    interaction.deferUpdate();
                    if (interaction.user.id !== member.id) return;
                    response = true
                    if (interaction.customId === 'yes') {
                        message.channel.send({ content: 'Duel request has been accepted! starting duel...' })
                        setTimeout(() => resolve(), 2000)
                    } else if (interaction.customId === 'no') {
                        return message.channel.send({ content: 'Duel request has been declined.' })
                    }
                })
                responseCollector.on('end', collected => {
                    if (response === true) return;
                    return message.channel.send('Duel request has timed out.')
                })
            })
                .then(async () => {
                    //making the image
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
                    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'duel.png');

                    healthbar = '🟩'

                    powerbar = '🟦'

                    let moveCount = 1;

                    let roundCount = 1;

                    const Elements = ['🔥', '💨', '⚡', '⛰️', '🌊']

                    var moves = ['nothing', 'nothing', 'neither', 'nothing']

                    // player count index (how the players will be identified)
                    var playerCount = 0

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

                    gameInfoObject = {
                        
                    }

                    // settings the class for the players.
                    class Player {
                        constructor(name) {
                            this.name = name
                        }
                        hp = 100
                        pp = 100
                        index = playerCount
                        element = Elements[Math.floor(Math.random() * 5)]
                        Elements = ['🔥', '💨', '⚡', '⛰️', '🌊']
                        moveCount = 0
                        currentMove = 'nothing'
                        move = []
                        hpDiff = []
                        ppDiff = []
                        reInitElement() {
                            this.element = this.Element[Math.floor(Math.random() * this.Elements.length)]
                        }
                        selectElement(element) {
                            this.element = element
                        }
                        newMove(move) {
                            this.moveCount++
                            this.move[this.moveCount] = move
                            this.hpDiff[this.moveCount] = 0
                            this.ppDiff[this.moveCount] = 0
                            this.currentMove = move
                        }
                        hpSubtract(subtractValue) {
                            // storing the intial hp.
                            this.initHp = this.hp
                            this.hp -= subtractValue
                            if (this.pp <= 0) this.pp = 0
                            this.hpDiff[this.moveCount] = this.hp - this.initHp
                            this.hpLost[this.moveCount] = this.initHp - this.hp
                        }
                        ppSubtract(subtractValue) {
                            //storing the initial power points.
                            this.initPp = this.pp
                            this.pp -= subtractValue
                            if (this.pp <= 0) this.pp === 0
                            this.ppDiff[this.moveCount] = this.pp - this.initPp
                            this.ppLost[this.moveCount] = this.initpp - this.pp
                        }
                        hpAdd(addValue) {

                            this.initHp = this.hp
                            this.hp += addValue
                            if (this.hp >= 100) this.hp = 100
                            this.hpDiff[this.moveCount] = this.hp - this.initHp
                            this.hpGained[this.moveCount] = this.hp - ithis.nitHp
                        }

                        ppAdd(addValue) {

                            this.initPp = this.pp
                            this.pp += addValue
                            if (this.pp >= 100) this.pp = 100

                            this.ppDiff[this.moveCount] = this.pp - this.initPp
                            this.ppGained[this.moveCount] = this.pp - this.initPp

                        }
                        logStringify(value) {
                            if (value >= 0) return `+${value}`
                            return `${value}`
                        }
                        reset() {
                            this.currentMove = 'nothing'

                        }
                    }

                    //setting the two instances for the class.
                    var player1 = new Player(message.author.username)
                    playerCount++
                    var player2 = new Player(member.displayName)



                    //adding an array containing all the buttons to control them all simultaneously.
                    const allButtons = [attackButton, dodgeButton, guardButton, elementButton, forfeitButton, drawButton]

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

                    let duelStatus = true

                    //making it repeat until one of the players has lost.
                    while (duelStatus === true) {
                        //using promises so that parts of the code only executed in the correct order.
                        new Promise(async (resolve, reject) => {

                            //getting the two players moves.
                            moveCollector.on('collect', async interaction => {
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
                            moveCollector.on('end', interaction => {
                                buttonDisable(true)

                                //if no move is selected
                                if (player1.currentMove === 'nothing') {
                                    player1.newMove('nothing')
                                }
                                if (player2.currentMove === 'nothing') {
                                    player2.newMove('nothing')
                                }


                                duelEmbed.edit({ embeds: [embed], files: [attachment], components: [buttonMoveRow, buttonForfeitRow] });

                                setTimeout(() => {
                                    if (typeof commentaryMessage !== 'undefined') {
                                        commentaryMessage.edit({ content: `**simulating outcome...**` })
                                    } else {
                                        response = true;
                                        return message.channel.send({ content: `**Duel ended due to inactivity.**` })
                                    }
                                    resolve()
                                }, 2000)
                            })
                        })
                            .then(() => {

                                //once the both players have selected their move, the move simulation function is activated
                                const moveSimulation = moveWinner(player1, player2)
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
                                            break;
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
                                        }, 7000)
                                    }, 10000)

                                }, 2000)



                            })
                    }
                    //after the duel ends / when the while loop is exited.
                    const endEmbed = new Discord.MessageEmbed()
                        .setTitle('Duel has ended')

                })


        } catch (err) {
            console.error(`duels error: ${err}`)
        }
    }
}