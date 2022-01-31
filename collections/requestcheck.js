const { ReactionEmoji, ReactionCollector, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
    request: async function(message, member) {
        try { 
        return new Promise(async (resolve, reject) => {
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
                        setTimeout(() => {
                            resolve(true)
                        }, 2000)
                    } else if (interaction.customId === 'no') {
                        message.channel.send({ content: 'Duel request has been declined.' })
                        resolve(false)
                    }
                })
                responseCollector.on('end', collected => {
                    if (response === true) return false;
                    message.channel.send('Duel request has timed out.')
                    resolve(false)
                })
            })
            } catch (err) { 
                console.error('request check error', err)
            }
    }
}