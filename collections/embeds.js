const { ReactionEmoji, ReactionCollector, MessageButton, MessageActionRow } = require('discord.js');
numCheck =  function(min, max, i) {
    if (i === min) {
        return max-1
    } else if (i === max) {
        return 0
    } else {
        return i
    }
}
module.exports = {
    pageEmbeds: async function (message, embed, timer) {
        try {
        var index = 0
        if (!timer) var timer = 60000;
        const buttonRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('left')
                    .setLabel('⏪')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('right')
                    .setLabel('⏩')
                    .setStyle('PRIMARY'),
            )
        const maxPage = embed.length
        const minPage = -1
        var messageEmbed = await message.channel.send({ embeds: [embed[index]] , components: [buttonRow]})
        const filter = i => i.customId === 'left' || i.customId === 'right'

        const collector = messageEmbed.createMessageComponentCollector({filter, time: timer});

        collector.on('collect', async interaction => {
            if (interaction.customId === 'left') {
                index--
                index = numCheck(minPage, maxPage, index)
                interaction.update({embeds: [embed[index]]})
            } else if (interaction.customId === 'right') {
                index++
                index = numCheck(minPage, maxPage, index)
                interaction.update({embeds: [embed[index]]})
            }
        })
        } catch (err) {
                console.error('page embeds error: '+err)
            }
    },

}