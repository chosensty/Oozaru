const fs = require('fs');

module.exports = (client, Discord) => {
    try{
        // a function for loading the directories
    const load_directory = (dirs) =>{
    const command_files = fs.readdirSync(`./commands/${dirs}`).filter(file => file.endsWith('.js'));

    for(const file of command_files) {
        // requiring the file
        const command = require(`../commands/${dirs}/${file}`);
        // if command name exists
        if(command.name) {
            client.commands.set(command.name, command)
        } else {
            continue;
        }

    }
    }

    // gets the list of directories from commands
    const { readdirSync } = require('fs')

    // get's the list of directories in a folder.
    const getDirectories = source =>
    readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)

    getDirectories('./commands/').forEach((e) => load_directory(e))
}catch (err) {
    console.log(err)
  } 
}