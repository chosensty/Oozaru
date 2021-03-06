const Elements = ['🔥', '💨', '⚡', '⛰️', '🌊']
const moveset = ['👊', '🛡️', '🛡️']
const Chance = require('chance')
const { lightning_moves } = require('./duelsPhraseList')
const chance = new Chance
const phrases = require('./duelsPhraseList')
module.exports = {
    elementFun: function (e1, e2) {
        function indexCheck(index) {
            if (index <= -1) {
                return 4 - (index + 1);
            } else if (index >= 5) {
                return 0 + (index - 5);
            } else {
                return index
            }
        }
        // first index is the dominant player, second is the other player, third is the advantage multiplier
        if (e1 === e2) return [0, 1, 1];

        for (let i = 0; i < 5; i++) {
            if (Elements[i] === e1) {
                if (e2 === Elements[indexCheck(i - 1)]) {
                    return [1, 0, 2];
                } else if (e2 === Elements[indexCheck(i + 1)]) {
                    return [0, 1, 2];
                } else if (e2 === Elements[indexCheck(i + 2)]) {
                    return [1, 0, 1.5];
                } else if (e2 === Elements[indexCheck(i - 2)]) {
                    return [0, 1, 1.5];
                }



            }
        }
    },
    attackName: function (move) {
        if (move === '🔥') {
            return phrases.fire_moves[Math.floor(Math.random() * phrases.fire_moves.length)]
        } else if (move === '💨') {
            return phrases.wind_moves[Math.floor(Math.random() * phrases.wind_moves.length)]
        } else if (move === '⚡') {
            return phrases.lightning_moves[Math.floor(Math.random() * phrases.lightning_moves.length)]
        } else if (move === '⛰️') {
            return phrases.earth_moves[Math.floor(Math.random() * phrases.earth_moves.length)]
        } else if (move === '🌊') {
            return phrases.water_moves[Math.floor(Math.random() * phrases.water_moves.length)]
        } else {
            return phrases.hit[Math.floor(Math.random() * phrases.hit.length)]
        }
    },

    moveWinner: function (player1, player2) {
        return new Promise((resolve, reject) => {
        otherIndex =  function (i) {
            if (i === 0) return 1
            return 0
        }
            // player objects
            const players = [player1, player2]

        // an array of all players
        const playerArray = [player1.currentMove, player2.currentMove]

        //all different outcomes
        const outComes = [player1.currentMove, player2.currentMove, 'neither', 'both', 'nothing']

        const playerNames = [player1.name, player2.name, 'neither', 'both']

        const outputType = []

        const randomHitType = []
        //statistical outputs
        const playerOutputs = playerArray.map((player, index) => {
            outputType[index] = chance.weighted(['heavy', 'normal'], [10, 90])
            console.log(Elements)
            console.log(player)
            if (outputType[index] === 'normal') multiplier = 1; randomHitType[index] = phrases.hits[Math.floor(Math.random() * phrases.hits.length)]
            if (outputType[index] === 'heavy') multiplier = 1.5; randomHitType[index] = phrases.hard_hit[Math.floor(Math.random() * phrases.hard_hit.length)]
            if (player === 'attack') {
                return (Math.floor(Math.random() * 6) + 10) * multiplier
            } else if (player === 'guard') {
                return (Math.floor(Math.random() * 21) + 50) * multiplier
            } else if (Elements.includes(player)) {
                players[index].ppSubtract(Math.floor(Math.random() * 10) + 25)
                return (Math.floor(Math.floor() * 11) + 15) * multiplier
            } else if (player === 'dodge') {
                return (Math.floor(Math.random() * 11) + 45) * multiplier
            }
        })


        const attackTypes = ['attack', '🔥', '💨', '⚡', '⛰️', '🌊']

        const passiveTypes = ['guard', 'dodge']


        //when both players are attacking.

        console.log(playerArray)
    
        if (attackTypes.includes(playerArray[0]) && attackTypes.includes(playerArray[1])) {


            // if both of them are attacking using elements

            if (Elements.includes(playerArray[0]) && Elements.includes(playerArray[1])) {
                // getting the dominant element/ player
                const elemDom = elementFun(playerArray[0], playerArray[1])
                console.log('element vs element')
                //getting the winner of the trade off.]
                var winnerIndex = chance.weighted([elemDom[0], elemDom[1], 2, 3], [(35 * elemDom[2]), 35, 15, 15])
                if (winnerIndex < 2) {
                    var loserIndex = other(winnerIndex)
                    var speech = phrases.elementVsElement(players[winnerIndex], players[loserIndex], winnerIndex)
                    players[loserIndex].hpSubtract(playerOutputs[winnerIndex])
                         
                } else {
                    var speech = phrases.elementVsElement(player1, player2, winnerIndex)
                    if(winnerIndex === 3) {
                        players[0].hpSubtract(playerOutputs[1])
                        players[1].hpSubtract(playerOutputs[0])
                    }
                }
            // when both players are using physical attacks. c
            
            } else if (playerArray[0] === 'attack' && playerArray[1] === 'attack') {
                // if both of them use physical attacks
                var winnerIndex = chance.weighted([0, 1, 2, 3], [40, 40, 10, 10])
                var loserIndex = otherIndex(winnerIndex)
                console.log('attack vs attack')

                if (winnerIndex < 2) {
                    var speech = phrases.attackVsAttack(players[winnerIndex], players[otherIndex(winnerIndex)], winnerIndex)
                    players[loserIndex].hpSubtract(playerOutputs[winnerIndex])
                } else {
                    var speech = phrases.attackVsAttack(players[0], players[1], winnerIndex)
                    if (winnerIndex === 3) {
                        players[0].hpSubtract(playerOutputs[1])
                        players[1].hpSubtract(playerOutputs[0])
                    }
                }


            // when one is using physical attacks and the other is using elemental attacks.
            
        
            } else {
                let attacker = playerArray.indexOf('attack')
                let otherPlayer = otherIndex(attacker)

                console.log('element vs attack')

                //getting the winner index
                let winnerIndex = chance.weighted([players[otherPlayer].index, players[attacker].index, 2, 3], [55, 35, 15, 15])
                if (winnerIndex < 2) {
                    var speech = phrases.attackVsElementSpeech(players[attacker], players[otherPlayer], winnerIndex)
                    let loserIndex = otherIndex(winnerIndex)
                    players[loserIndex].hpSubtract(playerOutputs[winnerIndex])
                } else {
                    var speech = phrases.attackVsElementSpeech(players[0], players[1], winnerIndex)
                    if (winnerIndex === 3) {
                        players[0].hpSubtract(playerOutputs[1])
                        players[1].hpSubtract(playerOutputs[0])
                    }
                }
            }



        // one attack and one passive.
        
        } else if (attackTypes.includes(playerArray[0]) || attackTypes.includes(playerArray[1])) {
            //getting the attacker

            if (attackTypes.includes(playerArray[0])) {
                var attackerIndex = 0
                var passiveIndex = 1
            } else {
                var attackerIndex = 1
                var passiveIndex = 0
            }



            //if the player dodges

            if (playerArray[passiveIndex] === 'dodge') {
                console.log('dodge vs attack')
                var winnerIndex = chance.weighted([attackerIndex, passiveIndex], [100 - playerOutputs[passiveIndex], playerOutputs[passiveIndex]])
                if (winnerIndex === passiveIndex) {
                    //dodge successful
                    var speech = phrases.dodgeSpeech(playerNames[attackerIndex], playerNames[passiveIndex], outputType[attackerIndex], playerArray[attackerIndex], true)

                    //adding health to the successful dodger.
                    players[passiveIndex].hpAdd(Math.floor(Math.random() * 5) + 10)

                    // return the updated player objects, the speech 
                } else {
                    //dodge failed
                    var speech = phrases.dodgeSpeech(playerNames[attackerIndex], playerNames[passiveIndex], outputType[attackerIndex], playerArray[attackerIndex], false)

                    // subtracting health from the dodger
                    players[passiveIndex].hpSubtract(playerOutputs[attackerIndex])
                }



                //if the player blocks


            } else {
                console.log('block vs attack')
                var winnerIndex = chance.weighted([passiveIndex, attackerIndex], [65, 35])

                // subtracting only a specific amount of health, not all of it.
                if (winnerIndex === passiveIndex) {
                    players[passiveIndex].hpSubtract(playerOutputs[attackerIndex] * (playerOutputs[passiveIndex] / 100))

                    // generating speech
                    var speech = phrases.dodgeSpeech(playerNames[attackerIndex], playerNames[passiveIndex], playerArray[attackerIndex], true)
                    players[passiveIndex].ppAdd(Math.floor(Math.random() * 5) + 15)
                } else {
                    players[passiveIndex].hpSubtract(playerOutputs[attackerIndex])

                    var speech = phrases.dodgeSpeech(playerNames[attackerIndex], playerNames[passiveIndex], playerArray[attackerIndex], false)
                }

            }


        } else {
            // nothing will happen in this case

            // (if both players dodge or one player does nothing)

            var speech = phrases.nothingHappens(playerNames[0], playerNames[1])
            winnerIndex = 2

        }
        resolve([players, speech, playerNames[winnerIndex]])

    })
    },
    bars: function (barEmoji, point) {
        let newBar = '';
        for (let i = 0; i < parseInt(point / 20); i++) {
            newBar += barEmoji
        }
        if (newBar.length < 5) {
            for (let index = newBar.length / 2; index < 5; index++) {
                newBar += '🟥'
            }
        }
        console.log(newBar)
        return newBar
    },
    duelEnd: function (reason, winner) {
        // giving the different values for different reasons of victory.
        
        if (reason === 'victory') {

        } else if (reason === 'draw') {

        } else if (reason === 'forfeit') {

        } else if (reason === 'draw')
        return;
    },
    // settings the class for the players.
    Player: class {
        constructor(name, index, info) {
            this.name = name
            this.index = index
            this.player_info = info
        }
        hp = 100
        pp = 100
        Elements = ['🔥', '💨', '⚡', '⛰️', '🌊']
        element = this.Elements[Math.floor(Math.random() * 5)]
        moveCount = 0
        currentMove = 'nothing'
        move = []
        hpDiff = []
        ppDiff = []
        reInitElement() {
            this.element = this.Element[Math.floor(Math.random() * this.Elements.length)]
        }
        selectElement(element) {
            this.element = element
        }
        newMove(move) {
            this.moveCount++
            if (move === 'element') this.currentMove = this.element; else this.currentMove = move
            this.hpDiff.push(0)
            this.ppDiff.push(0)
            this.move.push(this.currentMove)
        }
        hpSubtract(subtractValue) {
            // storing the intial hp.
            console.log('hp mins '+subtractValue)
            this.hpDiff[this.moveCount-1] = 0 - subtractValue
            this.hp -= subtractValue
            if (this.hp <= 0) this.hp = 0
        }
        ppSubtract(subtractValue) {
            //storing the initial power points.
            this.ppDiff[this.moveCount-1] = 0 - subtractValue
            this.pp -= subtractValue
            if (this.pp <= 0) this.pp === 0
        }
        hpAdd(addValue) {

            this.hpDiff[this.moveCount-1] = addValue
            this.hp += addValue
            if (this.hp >= 100) this.hp = 100
        }

        ppAdd(addValue) {
            this.ppDiff[this.moveCount-1] = addValue
            this.pp += addValue
            if (this.pp >= 100) this.pp = 100

            

        }
        logStringify(value) {
            if (value >= 0) return `+${value}`
            return `${value}`
        }
        reset() {
            this.currentMove = 'nothing'
        }
    }






}
