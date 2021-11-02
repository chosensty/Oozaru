module.exports = {

    // just a bunch of names for each move.
    hard_hit: ['destroy', 'blitz', 'strike', 'demolish', 'obliterate', 'bombard'],
    attacks: ['leaf hurricane', 'dynamic entry', '', 'rapid punch', 'lion barrage', 'detroit smash', 'twin lion fists', 'dragon fist'],
    hits: ['attacks', 'charges at', 'rushes', 'approaches'],
    hit: ['hit', 'attacked', 'rushed', 'struck'],
    miss: ['misses', 'is just short of', 'fails to hit'],
    tries: ['tries', 'attempts'],
    amazingly: ['amazingly', 'astonishingly', 'suprisingly', 'unexpectedly', 'stunningly', 'shockingly'],
    water_moves: ['water dragon jutsu', 'striking tide', 'water gun', 'water vortex', 'aqua jet', 'water bomb', 'whirlpool', 'constant flux', 'water veil', 'wall of water'],
    lightning_moves: ['electro net', 'chidori', 'lightning blade', 'storm release', 'giga volt havoc', 'thunder clap and flash', 'thunder swarm', 'heat lightning'],
    fire_moves: ['flambage shot', 'diable jambe','majestic destroyer flames', 'flame thrower', 'dance of the fire god', 'flare blitz', 'fire ball jutsu', 'blaze kick', 'pyro ball'],
    wind_moves: ['rasen shuriken', 'wind slash', 'hurricane', 'aerial ace', 'super sonic strike', 'air cutter', 'aero blast', 'dust whirlwind cutter', 'rising dust storm', 'gale-sudden gusts'],
    earth_moves: ['volcanoic rock, rapid conquest', 'earthquake', 'tomb stone', 'mud slap', 'drill run', 'continental crush', 'sand coffin', 'stone age', 'mud wall'],
    dodgesWords: ['dodges', 'escapes', 'avoids', 'leaps over it'],
    dodgeWords: ['dodge', 'escape', 'avoid', 'jump over'],
    able: ['is able to', 'manages to', 'is capable of', 'is prepared and'],
    confusionMove: ['mirage tempo', 'shadow clone jutsu', 'solar flare', 'body transformation', 'genjutsu'],
    elements: ['🔥', '💨', '⚡', '⛰️', '🌊'],
    getMove: function(attackType) {

        // getting the move name for each move.
        if (attackType === 'attack') {
            return this.attacks[Math.floor(Math.random()*this.attacks.length)]
        } else if (attackType === '🔥') {
            return this.fire_moves[Math.floor(Math.random()*this.fire_moves.length)]
        } else if (attackType === '💨') {
            return this.wind_moves[Math.floor(Math.random()*this.wind_moves.length)]
        } else if (attackType === '⚡') {
            return this.lightning_moves[Math.floor(Math.random()*this.lightning_moves.length)]
        } else if (attackType === '⛰️') {
            return this.earth_moves[Math.floor(Math.random()*this.earth_moves.length)] 
        } else {
            return this.water_moves[Math.floor(Math.random()*this.water_moves.length)]
        }
    },
    dodgeSpeech: function(attacker, dodger, attackType, attackStyle, dodgeWin) {
    

    // getting the names of the move.
    attackName = this.getMove(attackStyle)

    randDodgeWords = this.dodgeWords[Math.floor(Math.random()*4)]

    // if the dodger is successful
    const successfulDodgeSpeeches = [
        `${attacker} ${this.tries[Math.floor(Math.random()*2)]} to ${this.hits[Math.floor(Math.random()*this.hits.length)]} using ${attackName}, but ${dodger} evades with ease.`,
        `${dodger} skips past ${attacker}'s ${attackStyle}, avoiding all damage.`,
        `${attacker} ${this.tries[Math.floor(Math.random()*2)]} to quickly release ${attackName} but ${dodger} anticipates it and simply dodges the attack.`,
        `${dodger} escapes ${attacker}'s ${attackStyle} with style.`,
        `With quick pace, ${attacker} ${this.hits[Math.floor(Math.random()*this.hits.length)]} ${dodger} using ${attackName} but he narrowly misses as ${attacker} makes a last second dodge.`,
    ]

    // if the dodger is failed
    const failDodgeSpeeches = [
        `${dodger} plans to ${randDodgeWords} ${attacker}'s ${attackName}, but he is caught off guard and is ${this.hit[Math.floor(Math.random()*this.hit.length)]} by ${attacker}.`,
        `${attacker} approaches ${dodger}, who tries to dodge however ${attacker} proves too much for him, unleashing a devestating ${attackStyle}.`,
        `${attacker} obliterates ${dodger} with a fine ${attackName}, who tried dodging.`,
        `${dodger} attempts to ${randDodgeWords} ${attacker}'s ${attackName}. But is caught and receives the full damage of the attack.`,
    ]

    //if the dodge won
    if (dodgeWin === true) return successfulDodgeSpeeches[Math.floor(Math.random()*successfulDodgeSpeeches.length)]
    return failDodgeSpeeches[Math.floor(Math.random()*failDodgeSpeeches.length)]
    },



    blockSpeech: function(attacker, blocker, attackStyle, blockWin) {
        // getting the name of the attack

        var attackName = this.getMove(attackStyle)


        var successfulBlockSpeech = [
            `${attacker} unleashes a solid ${attackName}, ${blocker} has his guard up and negates a portion of the damage.`,
            `${attacker} sees ${blocker} on the back pedal and ${this.attacks[Math.floor(Math.random()*this.attacks.length)]} him using ${attackName}. ${blocker} shields this off and reduces the damage taken.`,
            `${blocker} covers himself but regardless of this ${attacker} fires a ${attackName} at him, who deals a fair bit of damage.`,
            `${blocker} is cornered and is ${this.attacks[Math.floor(Math.random()*this.attacks.length)]} by ${attacker}'s ${attackName}. He has no option but to block it and reduces the damage taken by doing so.`
        ]
        var failedBlockSpeech = [
            `${attacker} unleashes ${attackName} with pace, ${blocker} tries to block it however the attack proves too much for him as he takes the full impact of the attack.`,
            `${blocker} tries charge up a bit of energy as he puts his guard up, ${attacker} however manages to get behind him, unleashing a devestating ${attackName}.`,
            `${attacker} catches ${blocker} off guard, as he jumps at him and releases an incredible ${attackName}.`,
            `${blocker} decides to not attack his opponent, but to stay back and keep distance, however he pays the price heavily for this as ${attacker} bombards him using ${attackName}.`,
        ]
        if (blockWin === true) return successfulBlockSpeech[Math.floor(Math.random()*successfulBlockSpeech.length)]
        return failedBlockSpeech[Math.floor(Math.random()*failedBlockSpeech.length)]
    },
    attackVsElementSpeech: function(attackingPlayer, elementalPlayer, winner) {
        var attackName = this.getMove(attackingPlayer.currentMove)
        var elementName = this.getMove(elementalPlayer.currentMove)
        var attackUser = attackingPlayer.name
        var elementUser = elementalPlayer.name

        var attackWinner = [
            `${attackUser} is cornered by ${elementUser}'s ${elementName}. However he keeps his cool, gets behind his opponent and strikes with a strong ${attackName}.`,
            `${elementUser} tries using ${elementName}, but he loses sight of his opponent who drops from above to unleash a quick ${attackName}.`,
            `${elementUser} aggresively charges forward while bombarding ${attackUser} with ${elementName}, he narrowly misses and is punished by ${attackUser}'s ${attackName}.`,
            `${attackUser} anticipates ${elementUser}'s ${elementName}, he evades it with still before striking him with ${attackName}.`,
        ]
        var elementWinner = [
            `${attackUser} tries charging in with ${attackName}, but unfortunately for him he is caught by ${elementUser}'s ${elementName}.`,
            `${attackUser} sets himself up for a ${attackName}, however he is caught off guard as ${elementUser} bombards him with ${elementName}.`,
            `${elementUser} catches ${attackUser} off guard with a quick ${elementName}.`,
            `${elementUser} fires ${elementName} at ${attackUser} he tries to evade it but unfortunately for him he is hit and takes the full impact.`
        ]

        var draw = [
            `${attackUser} runs at ${elementUser} and gets ready to unleash ${attackName}, ${elementUser} sees this and counterattacks using ${elementName}. None of their attacks land and it ends in a complete draw.`,
            `${elementUser} starts it off with a ${elementName} which ${attackUser} cooly dodges. He then tries an attack of his own using ${attackName} but it fails to connect.`,
            `${attackUser} closes down the distance and looks for an opening for his ${attackName}, ${elementUser} backs off a bit then uses ${elementName}. ${attackUser} has no time to dodge and cancels it out using ${attackName}, resulting in no victors.`,
            `${elementUser} attempts to catch his opponent off guard with a quick ${elementName}, however ${attackUser} gets behind him and attacks him using ${attackName}. In the end ${elementUser} avoids it and no one is damaged in this exchange.`,
        ]

        var both = [
            `${attackUser} sends ${elementUser} flying with a quick and devastating ${attackName}, but ${elementUser} refuses to be taken down alone as he quickly fires ${elementName} which consequently enough results in both players taking damage.`,
            `Both players approach each other simultaneously! one firing ${attackName} and the other unleashing ${elementName} both players take great damage in the end.`,
            `${elementUser} finds an opening and punishes ${attackUser} with ${elementUser}, he prepares for another attack but ${attackUser} sees this and unleashes a quick counterattack using ${attackUser} sending his opponent flying and crashing into the wall!`,
            `${attackUser} confuses his opponent using ${this.confusionMove[Math.floor(Math.random()*this.confusionMove.length)]} and strikes him using ${attackName}, ${elementUser} quickly regains his footing and fires ${elementName} which catches his opponent off guard.`,
        ]
        if (winner === 'attack') {
            return attackWinner[Math.floor(Math.random()*attackWinner.length)]
        } else if (this.elements.includes(winner)) {
            return elementWinner[Math.floor(Math.random()*elementWinner.length)]
        } else if (winner === 'neither') {
            return draw[Math.floor(Math.random()*draw.length)]
        }
        return both[Math.floor(Math.random()*both.length)]
    },



    attackVsAttack: function(winningPlayer, otherPlayer, winnerIndex) {
        var winMove = this.getMove(winningPlayer.currentMove) 
        var winName = winningPlayer.name

        var otherMove = this.getMove(otherPlayer.currentMove)
        var otherName = otherPlayer.name


        var win = [
            `${otherName} starts his attack off with a ${otherMove}. ${winName} manages to overpower him using ${winMove}, dealing a good deal of damage.`,
            `${winName} confuses his opponent with ${this.confusionMove[Math.floor(Math.random()*this.confusionMove.length)]}. ${otherName} panics and attempts a desperate ${otherMove} however his attack fails to land as ${winName} strikes him using ${winMove}`,
            `${winMove} is quickly unleashed by ${winName}, which gets a direct hit on ${otherName} who was preparing to use ${otherMove} but couldn't time it well.`,
            `${otherName} thinks he's found an opening and sends ${otherMove} at his opponent's direction, he pays the price for this as ${winName} manages to land a devastating ${winMove} straight to the face.`,
        ]

        var draw = [
            `Both opponents charge at eachother from either side, bombarding eachother using ${winMove} and ${otherMove}, in the end they cancel each others attacks.`,
            `${winName} gets it up and running by preparing to strike ${otherName} with ${winMove}, he narrowly misses and ${otherName} tries to make the most of this by counter-attacking however his opponent dodges it and both players evade all damage.`,
            `${otherMove} attacks using ${otherName}, ${winName} has no place to run and uses ${winMove} in hopes to the negate the damage. At the end the result is a simple draw.`,
            `${winName} jumps into the sky and falls while preparing ${winMove} to crush his opponent. However ${otherName} has ideas of his own as he jumps up to meet him with ${otherMove}, his attack ends up being stronger however gravity is on ${winName}'s side as he scrapes a draw.`,
        ]

        var both = [
            `${winName} knocks ${otherName} down using ${winMove}, he looks over his opponent before throwing another one however in the final moments ${otherName} rises and manages to hit his opponent with ${otherMove}.`,
            `${winName} approaches with ${winMove} and ${otherName} advances using ${otherMove}, they have an all out trade off which in the end results in both players taking damage.`,
            `${otherName} catches ${winName} off guard and sends him flying with ${otherMove}; but ${winName} doesn't give up as he regains footing and strikes back with ${winMove}.`,
            `${otherName} and ${winName} trade hits at the exact same time, one using ${otherMove} and the other using ${winMove}.`,
        ]

        if (winnerIndex === 0 || winnerIndex === 1) return win[Math.floor(Math.random()*win.length)]
        if (winnerIndex === 2) return draw[Math.floor(Math.random()*draw.length)]
        return both[Math.floor(Math.random()*both.length)]
    },
    elementVsElement: function(winningPlayer, otherPlayer, winnerIndex) { 
        var winName = winningPlayer.name
        var winMove = this.getMove(winningPlayer.currentMove)

        var otherName = otherPlayer.name
        var otherMove = this.getMove(otherPlayer.currentMove)

        var win = [
            `${winName} gets the round up and running by unleashing ${winMove}, ${otherName} responds with ${otherMove} but he is overwhelmed and takes a great deal of damage!`,
            `${winName} with quick pace fires ${winMove} which lands a direct hit on ${otherName} before he can prepare his own counter attack.`,
            `${otherName} tries to catch his opponent off guard using ${otherMove}, ${winName} sees through it, avoids it and successfuly counter attacks using ${winMove}.`,
            `${otherName} starts charging up his ${otherMove}, however he is instantly blitzed by ${winName} who lands a devestating ${winMove}`,
            `Both players charge in at full power with ${winMove} and ${otherMove}, they end up clashing with ${winName} coming out on top.`,
        ]

        var draw = [
            `Both opponents charge at eachother from either side, bombarding eachother using ${winMove} and ${otherMove}, in the end they cancel each others attacks.`,
            `${winName} gets it up and running by preparing to fire at ${otherName} with ${winMove}, he narrowly misses and ${otherName} tries to make the most of this by counter-attacking however his opponent dodges it and both players evade all damage.`,
            `${otherMove} attacks using ${otherName}, ${winName} has no place to run and uses ${winMove} in hopes to the negate the damage.Their attacks collide and at the end the result is a simple draw.`,
        ]

        var both = [
            `${winName} destroys ${otherName} using ${winMove}, he looks over his opponent before using another one however in the final moments ${otherName} rises and manages to counter attacks his opponent with ${otherMove}.`,
            `${winName} approaches with ${winMove} and ${otherName} advances using ${otherMove}, they have an all out trade off which in the end results in both players taking damage.`,
            `${otherName} catches ${winName} off guard and sends him flying with ${otherMove}; but ${winName} doesn't give up as he regains footing and strikes back with ${winMove}.`,
            `${otherName} and ${winName} both attack each other, the impact of the clash causes an explosion and leaves both of them injured.`,
        ]
        if (winnerIndex <2) return win[Math.floor(Math.random()*win.length)]; else if (winnerIndex === 2) return draw[Math.floor(Math.random()*draw.length)]
        return both[Math.floor()*Math.random()*both.length]
    },
    nothingHappens: function(player1, player2) {
        var move1 = this.getMove(player1.currentMove) 
        var name1 = player1.name


        var move2 = this.getMove(player2.currentMove)
        var name2 = player2.name


        var speech = [
            `Both players have no intention to attack, one plans to ${move1} and the other wants to ${move2}. But the end product is total silence.`,
            `The two opponents analyse each other to see what they are willing to do, each one waits for the other to make a move but in the end neither have any attacking intent.`,
            `${name1} wants to ${move1} his opponents attack, but bizzarely enough ${name2} wants to ${move2} meaning that this round ends with no fighting what so ever.`,
            `${name2} thinks that his opponent is going to attack him so he gets on the defensive, but his opponent does the same, no attacks are launched on either fighters.`,
            `Maybe out of fear, both of the fighters refuse to approach one another and wait for their opponents move, neither of them attack and it this round ends without a victor.`,
            `Both players use this round in order to rest/ get their power back, meaning that neither decide to attack.`,
        ]
        return speech[Math.floor(Math.random()*speech.length)]

    }
}