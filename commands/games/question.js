const { prefix } = require('../../config.json')
const fs = require('fs');
const readline = require('readline');
module.exports = {
    name: 'question',
    description: 'Asks a randomly generated question.',
    help: `\`\`${prefix}question\`\``,
    aliases:['questions'],
    permissions: [],
    cooldown:5,
    execute (client, message, args) {
    try{
    async function processLineByLine(path) {

      // reading through all the lines.
        const fileStream = fs.createReadStream(path);
      
        const rl = readline.createInterface({
          input: fileStream,
          crlfDelay: Infinity
        });
        // Note: we use the crlfDelay option to recognize all instances of CR LF
        // ('\r\n') in input.txt as a single line break.
        let qArray = [];
        for await (const line of rl) {
          // Each line in input.txt will be successively available here as `line`.
          qArray.push(line);
        }
        const dice = Math.floor(Math.random()*qArray.length)
        message.channel.send(qArray[dice])
      
      

      }
      return processLineByLine('./text_files/questions.txt');
  } catch (err) {
    console.log(err);
  }
}
}