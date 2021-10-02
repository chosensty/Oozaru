const fs = require('fs');
module.exports = (client, Discord) => {
    try{
        const event_files = fs.readdirSync(`./events`).filter(file => file.endsWith('.js'));

        //loops through all of the files and requires them
        for(const file of event_files) {
            const event = require(`../events/${file}`);
            // event listener for all of the events
            client.on(event.name, event.execute.bind(null, client))

        }

    // gets the list of directories from the events folder
    const { readdirSync } = require('fs')

    const getDirectories = source =>
    readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)

    getDirectories('./events/').forEach((e) => load_dir(e))
}catch (err) {
    console.log(err)
  } 
}