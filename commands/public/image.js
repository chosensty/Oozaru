var Scraper = require('images-scraper');

const google = new Scraper({
    puppeteer: {
        headless: true
    }
})

const { prefix } = require('../../config.json')

module.exports = {
    name: 'image',
    description: 'Sends the top image (searched by google).',
    aliases: ['img'],
    permissions: [],
    help: `\`\`${prefix}image <name of image>\`\``,
    cooldown:60,
    async execute(client, message, args){
        try{
        //joins the arguments array.
        const image_query = args.join(' ');

        // validation checks.
        if(!image_query) return message.channel.send('Please enter an image now');

        // looks for the image.
        const image_results = await google.scrape(image_query, 1);

        // sends the image.
        message.channel.send(image_results[0].url); 
    } catch (err) {
        console.log(err)
    }
}
}