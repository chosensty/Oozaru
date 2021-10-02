const redis = require('redis');
const { redisPath } = require('../config.json')

module.exports = async () => {
    return await new Promise((resolve, reject) => {
        const client = redis.createClient({
            url: redisPath
        })

        client.on('error', (err) => {
            console.error('Reddis error:', err)
            client.quit()
            reject(err)
        })

        client.on('ready', () => {
            resolve(client)
        })
    })
    

}
module.exports.expire = (callback) => {
        const expired = () => {
            const sub = redis.createClient({url:redisPath})
            sub.subscribe('__keyevent@0__:expired', () => {
                sub.on('message', (channel, message) => {
                    callback(message)
                })
            })
        }
        const pub = redis.createClient({url: redisPath})
        pub.send_command('config', ['set', 'notify-keyspace-events', 'Ex'], expired())
    }
// kUgxsw9f6yhmNnMg7fuaRjsnwk4WULzJ
// redis-10674.c242.eu-west-1-2.ec2.cloud.redislabs.com:10674