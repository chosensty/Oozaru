const { MessageButton, MessageActionRow} = require('discord.js')
const { Player, winner_check } = require('../../collections/minigames/rpsfuns.js')
const { collect_moves_rps } = require('../../collections/minigames/collectmoves.js')
const { prefix } = require('../../config.json');
const { request } = require('../../collections/requestcheck')
module.exports = {
    name: 'rps',
    description: 'rock paper scissors',
    help: `\`\`${prefix}duel <the user that you'd like to play against> <first to how many wins>\`\``,
    aliases: ['rockpaperscissors'],
    permissions: [],
    cooldown: 10,
    async execute(client, message, args, Discord) {
        // if there are no arguments given
        if (!args.length) return message.reply(`Please enter a user that you'd like to duel.`);

        //getting the member
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (member.id === message.author.id) return message.reply('You can\'t duel your self.')
        // a few validation checks
        if (!member) return message.reply('Please enter a valid user to duel.');
        let duel_count = args[1]
        if (!duel_count) duel_count = 1
        if (isNaN(duel_count)) return message.reply(`Please enter the number of rock paper scissors game you\'d like to play up to. \n**${this.help}**`)
        if (duel_count > 10) return message.reply(`The maximum is first to 10 duels \n**${this.help}**`)


        // duel request function here
        const response = await request(message, member, 'a game of rock paper scissors')
        if (!response) return

        const buttons = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('rock')
                    .setLabel('🪨')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('paper')
                    .setLabel('🧾')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('scissors')
                    .setLabel('✂️')
                    .setStyle('SECONDARY')

            )
        let player_moves

        let player1 = new Player(message.author.username, 0, message) 
        let player2 = new Player(member.displayName, 1, member)

        game_function = async function(){
            let rps_message = await message.channel.send({content: `**Rock, paper or scissors?**`, components: [buttons]})

            let moves = collect_moves_rps(rps_message, player1, player2)
            player1.new_move(moves[0])
            player2.new_move(moves[1])
            
            let round_winner = winner_check()
            

        }

        game_function()

            
    }
}