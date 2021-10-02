const pastas = require('../../collections/pastas.json')
const { prefix } = require('../../config.json');
module.exports = {
    name:'copypasta',
    description:'Sends a random copypasta',
    help:`\`\`${prefix}copypasta\`\``,
    aliases: ['pasta', 'copy'],
    permissions: [],
    cooldown: 15,
    execute(client, message, args) {
        try{
        const pastaLength = Object.keys(pastas).length;
        const dice = Math.floor(Math.random()*pastaLength);
        message.channel.send(pastas['pasta'+dice])
        }catch (err) {
            console.log(err)
        }
    }
}