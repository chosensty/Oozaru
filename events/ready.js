module.exports ={
  name: 'ready',
  once:true,
  async execute (client, message) {
      try{
      //logs when it is online.
      console.log(`${client.user.tag.substring(0, client.user.tag.length-5)} is online.`)
      client.user.setActivity("Oozaru", { type: "WATCHING"})
  } catch(err) {
        console.error('ready error: '+err)
  }
}
}

