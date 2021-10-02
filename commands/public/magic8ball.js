const { prefix } = require('../../config.json')

module.exports = {
    name: 'magic8ball',
    description: 'Receives a question then returns an answer.',
    permissions: [],
    aliases: ['8ball', '8b', 'magicball', 'm8b'],
    cooldown: 5,
    help: `\`\`${prefix}magic8ball <question>.\`\``,
    execute (client, message, args){
        try{
        //validation checks
        if(!args.length) return message.reply('Please provide a questions.');
        if(!args[(args.length)-1].endsWith('?')) return message.reply('Please provide a question (they must end in a question mark.)');

        // variables.
        const dice = Math.floor(Math.random()*4)+1;
        const response = Math.floor(Math.random()*5)

        // list of all possible responses.
        yesResp = [
            'It is Certain.',
            'It is decidedly so.',
            'Without a doubt.',
            'Yes definitely.',
            'You may rely on it'
        ];
        likelyResp = [
            'As I see it, yes.',
            'Most likely.',
            'Outlook good.',
            'Yes.',
            'Signs point to yes.'
        ]
        unsureResp = [
            'Reply hazy, try again.',
            'Ask again later.',
            'Better not tell you now.',
            'Cannot predict now.',
            'Concentrate and ask again.'
        ];
        noResp = [
            'Don\'t count on it.',
            'My reply is no.',
            'My sources say no.',
            'Outlook not so good.',
            'Very doubtful.'
        ];

        // all the randomised conditions.
        if (dice === 1) {
            return message.reply(yesResp[response]);
        } else if (dice === 2) {
            return message.reply(likelyResp[response]);
        } else if (dice === 3) {
            return message.reply(unsureResp[response]);
        } else if (dice === 4) {
            return message.reply(noResp[response]);
        }

    }catch (err) {
        console.log(err)
      } 
    }
}