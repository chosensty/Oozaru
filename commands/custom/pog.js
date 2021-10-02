const { prefix } = require('../../config.json')

module.exports = {
    name: 'pog',
    description: "poggers", 
    permissions: [],
    cooldown: 3,
    help: `\`\`${prefix}pog\`\``,
    execute(client, message, args){
        try{
        //sends message.
        message.channel.send('poggers');
        }catch (err) {
            console.log(err)
          } 
    }
}