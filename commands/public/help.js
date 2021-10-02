
const { prefix } = require('../../config.json')
const {pageEmbeds} = require('../../collections/embeds');
module.exports = {
    name: 'help',
    description: 'displays all commands and how to use them.',
    aliases: ['h'],
    permissions: [],
    cooldown: 3,
    help: `\`\`${prefix}help <name of command you want help with>\`\``,
    async execute (client, message, args, Discord) {
        try {
        // initialising a few variables.
        let command_names = [];
        let command_help = [];
        Commands = client.commands;
                
        //appends all of the command names and descriptions onto the end of the array.
        Commands.forEach((v, k) => command_names.push(Commands.get(k).name));
        Commands.forEach((v, k) => command_help.push(Commands.get(k).help));
        //sets up the embed
        let pages = {
        }
        const itemPerPage = 8;
        pageCount = Math.ceil(command_names.length/itemPerPage);

        for (i=1; i<=pageCount;i++) {
            pages['page'+i] = new Discord.MessageEmbed()
            .setColor('#800080')
            .setTitle('Page '+i)
            .setDescription("How to use commands 😀\n\n")
            .setImage("")
            .setTimestamp()
        }
        
        //for loop which adds all the fields for all the commands
        for (let i = 1;i<=pageCount;i++) {

            for(let multiplier=0;multiplier<itemPerPage;multiplier++) {
                indexNumber = multiplier+(itemPerPage*(i-1));
                if(indexNumber >= command_names.length) break;

                pages['page'+i].addField(`${command_names[indexNumber]}`, `${command_help[indexNumber]}\n\n`);
            }
        };

        const emojis = ['⏪', '⏩'];
        const timeOut = '60000'
        const pageArray = [
            pages['page1'],
            pages['page2'],
            pages['page3']
        ]


        // sends the embed.
        if(!args.length) return pageEmbeds(message, pageArray, timeOut);


        // if an argument is given this condition is activated.
        if(command_names.find((i) => (i ===args[0].toLowerCase()))) {
            return message.channel.send('\`\`'+command_help[command_names.indexOf(args[0].toLowerCase())]+'\`\`');
        } else {
            message.channel.send(`Invalid argument  \`\`${args.join(' ')}\`\`, should be written like this: \`\`${this.help}\`\``)
        }

    } catch (err) {
        console.log(err)
    }
    }

}