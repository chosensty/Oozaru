const fs = require('fs');
const { prefix } = require('../../config.json')
const { pageEmbeds } = require('../../collections/embeds')
module.exports = {
    //this command is incomplete and needs work.
    name: 'commands',
    description: "Displays a list of the commands.",
    aliases:['command'],
    permissions:[],
    help: `\`\`${prefix}commands\`\``,
    cooldown: 5,
    execute(client, message, args, Discord) {
        try {
        // initialising a few variables.
        let command_names = [];
        let command_descriptions = [];
        Commands = client.commands;
        
        //appends all of the command names and descriptions onto the end of the array.
        Commands.forEach((v, k) => command_names.push(Commands.get(k).name));
        Commands.forEach((v, k) => command_descriptions.push(Commands.get(k).description));

        let pages = {
        }
        const itemPerPage = 8;
        pageCount = Math.ceil(command_names.length/itemPerPage);

        //for loop which adds the embed fields.
        for (i=1; i<=pageCount;i++) {
            pages['page'+i] = new Discord.MessageEmbed()
            .setColor('#800080')
            .setTitle('Page '+i)
            .setDescription("The list of commands in Anime House 😀\n\n")
            .setImage("")
            .setTimestamp()
        }
        // embed loop which adds fields accordingly.
        for (let i = 1;i<=pageCount;i++) {

            for(let multiplier=0;multiplier<itemPerPage;multiplier++) {
                indexNumber = multiplier+(itemPerPage*(i-1));
                if(indexNumber >= command_names.length) break;

                pages['page'+i].addField(`${command_names[indexNumber]}`, `${command_descriptions[indexNumber]}\n\n`);
            }
        };

        const emojis = ['⏪', '⏩'];
        const timeOut = 60000
        const pageArray = [
            pages['page1'],
            pages['page2'],
            pages['page3']
        ]


        // sends the embed.
        if(!args.length) return pageEmbeds(message, pageArray, timeOut);

        if(command_names.find((i) => (i ===args[0].toLowerCase()))) {
            return message.channel.send('\`\`'+command_descriptions[command_names.indexOf(args[0].toLowerCase())]+'\`\`');
        } else {
            message.channel.send(`Invalid argument  \`\`${args.join(' ')}\`\`, should be written like this: \`\`${this.help}\`\``)
        } 
    }catch (err) {
        console.log(err)
    }
}
}