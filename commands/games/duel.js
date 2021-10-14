const { prefix } = require('../../config.json');
const Canvas = require('canvas');
const { elementFun, moveWinner, bars } = require('../../collections/minigames/duelsfuns')
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
                    }                })
                responseCollector.on('end', collected => {
                    if (typeof reponse == 'undefined') response = false
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

                    const buttonDisable = function (status) {
                        buttonMoveRow.components.forEach((buttons) => buttons.disabled = status)
                        buttonForfeitRow.components.forEach((buttons) => buttons.disabled = status)      
                    }



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
                        move = 'nothing'
                        hpDiff = 0
                        ppDiff = 0
                        reInitElement() {
                            this.element = this.Element[Math.floor(Math.random()*this.Elements.length)]
                        }
                        selectElement(element) {
                            this.element = element
                        }
                        newMove(move) {
                            this.move = move
                            this.moveCount++
                            this.hpDiff = 0
                            this.ppDiff = 0
                        }
                        hpSubtract(subtractValue) {
                            this.hp -= subtractValue
                            if (this.pp <= 0) this.pp = 0
                            this.hpDiff -= subtractValue
                            this.hpLost = subtractValue
                        }
                        ppSubtract(subtractValue) {
                            this.pp -= subtractValue
                            if (this.pp <= 0) this.pp === 0
                            this.ppDiff -= subtractValue
                            this.ppLost = subtractValue
                        }
                        hpAdd(addValue) {
                            this.hp += addValue
                            if (this.hp >= 100) this.hp = 100
                            this.hpDiff += addValue
                            this.hpGained = addValue
                        }

                        ppAdd(addValue) {
                            this.pp += addValue
                            if (this.pp >= 100) this.pp = 100
                            this.ppDiff += addValue
                            this.ppGained = addValue

                        }
                        logStringify(value) {
                            if (value >= 0) return `+${value}`
                            return `${value}`
                        }
                    }
                    var player1 = new Player(message.author.username)
                    playerCount++
                    var player2 = new Player(member.displayName)

                    const allButtons = [attackButton, dodgeButton, guardButton, elementButton, forfeitButton, drawButton]
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`A duel between ${message.author.username} and ${member.displayName} has begun!`)
                        .addFields(
                            {
                                name: `${player1.name}`,
                                value: `**Health: ${player1.hp}\n${bars(healthbar, player1.hp)}\nPower: ${player1.pp}\n${bars(powerbar, player1.pp)}\nElemental power: ${player1.element}**`
                                , inline: true
                            },
                            {
                                name: `${player2.name}`,
                                value: `**Health: ${player2.hp}\n${bars(healthbar, player2.hp)}\nPower: ${player2.pp}\n${bars(powerbar, player2.pp)}\nElemental power: ${player2.element}**`
                                , inline: true
                            }
                        )
                        .setImage('attachment://duel.png')
                        .setFooter('You have 30 seconds to make a move! remember once you\'ve selected a move there\'s no going back...')
                    // sending a message and storing it in a variable for reactions.
                    var duelEmbed = await message.channel.send({ embeds: [embed], files: [attachment], components: [buttonMoveRow, buttonForfeitRow] });
                    const moveFilter = i => i.user.id === member.id || i.user.id === message.author.id
                    const moveCollector = duelEmbed.createMessageComponentCollector({ moveFilter, time: 30000 })
                    let commentaryMessage

                    //moves button collector.
                    new Promise(async (resolve, reject) => {
                        moveCollector.on('collect', async interaction => {
                            console.log(player1.move)
                            console.log(player2.move)
                            if (interaction.user.id === message.author.id) {
                                if (interaction.customId === 'forfeit') return message.channel.send(`**${player1.name} has forfeited the match.**`)
                                if (player1.move === 'nothing') {
                                    player1.newMove(interaction.customId)
                                    if (player2.move === 'nothing') {
                                        commentaryMessage = await message.channel.send({ content: `**${message.author.username} has selected his move! waiting on ${member.displayName}...**` })
                                    } else {
                                        commentaryMessage.edit({ content: `**${message.author.username} has now selected his move!**` })
                                        moveCollector.stop()
                                    }
                                }
                            } else {
                                if (interaction.customId === 'forfeit') return message.channel.send(`**${player2.name} has forfeited the match.**`)
                                if (player2.move === 'nothing') {
                                    player2.newMove(interaction.customId)
                                    if (player1.move === 'nothing') {
                                        commentaryMessage = await message.channel.send({ content: `**${member.displayName} has now selected his move! waiting on ${message.author.username}...**` })
                                    } else {
                                        commentaryMessage.edit({ content: `**${member.displayName} has now also selected his move!**` })
                                        moveCollector.stop()
                                    }
                                }
                            }
                            interaction.deferUpdate();

                        })
                        
                        moveCollector.on('end', interaction => {
                            buttonDisable(true)

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
                        .then(async() => {
                            const moveSimulation = await moveWinner(player1, player2)
                            await setTimeout(async () => {
                                if (!moveSimulation) return message.channel.send('**Duel error ocurred. Sorry for the inconvenience.**');
                                var moveSpeech = await `**${moveSimulation[1]}**`
                                commentaryMessage.edit({content: moveSpeech})
                                console.log(moveSimulation[0])
                                player1 = moveSimulation[0][0]
                                player2 = moveSimulation[0][1]

                                setTimeout(async () => {
                                    var testEmbed = await new Discord.MessageEmbed() 
                                        .setTitle(`Round ${player1.moveCount} summary`)
                                        .addFields(
                                            {
                                                name:`**${player1.name}**`,
                                                value:`**Selected move: ${player1.move}\nCurrent Health: ${player1.hp} [${player1.logStringify(player1.hpDiff)}]\nCurrent power: ${player1.pp} [${player1.logStringify(player1.ppDiff)}]\n Round Winner: ${moveSimulation[2]}**`,
                                                inline:true
                                            },
                                            {
                                                name:`**${player2.name}**`,
                                                value:`**Selected move: ${player2.move}\nCurrent Health: ${player2.hp} [${player2.logStringify(player2.hpDiff)}]\nCurrent power: ${player2.pp} [${player2.logStringify(player2.ppDiff)}]\n Round Winner: ${moveSimulation[2]}**`,
                                                inline:true
                                            }
                                        )
                                    await commentaryMessage.edit({embeds: [testEmbed]})
                                }, 10000)

                            }, 3000)
                            
                        })


                })

        } catch (err) {
            console.error(`duels error: ${err}`)
        }
    }
}