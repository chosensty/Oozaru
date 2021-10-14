const Elements = ['🔥', '💨', '⚡', '⛰️', '🌊']
const moveset = ['👊', '🛡️', '🛡️']
const Chance = require('chance')
const { lightning_moves } = require('./duelsPhraseList')
const chance = new Chance
const phrases = require('./duelsPhraseList')
module.exports = {
    
    // function used to compare elements and decide which one is superior.
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
    
    // getting the names for an attack.
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

    //the important and main function of this file, this is where all the move simulation happens.
    moveWinner: function (player1, player2) {
        
        //simply randomising output.
        outputRandomiser = function (output) {
            const dice = chance.weighted(['heavy', 'normal'], [10, 90])
            return dice
        },
            
            
        otherIndex = function (i) {
            if (i === 0) return 1
            return 0
        }    
        
        //VARIABLE DECLIRATION 
        
        // player objects
        players = [player1, player2]

        // an array of all players
        const playerArray = [player1.move, player2.move]

        //all different outcomes
        const outComes = [player1.move, player2.move, 'neither', 'both', 'nothing']

        const playerNames = [player1.name, player2.name]

        const outputType = []

        const randomHitType = []
        
        
        //statistical outputs for both players.
        
        const playerOutputs = playerArray.map((player, index) => {
            
            //getting the weight of the output (normal or heavy)
            outputType[index] = outputRandomiser(player)
            
            // the output type
            if (outputType[index] === 'normal') {
                var multiplier = 1
                randomHitType[index] = phrases.hits[Math.floor(Math.random() * phrases.hits.length)]
            } else {
                var multiplier = 1.5
                randomHitType[index] = phrases.hard_hit[Math.floor(Math.random() * phrases.hard_hit.length)]
            }
            
            // getting the output for each type of move.
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
            return 0
        })

        //attack type moves
        const attackTypes = ['attack', '🔥', '💨', '⚡', '⛰️', '🌊']

        //passive type move
        const passiveTypes = ['guard', 'dodge']
        console.log(playerArray)


        //when both players are attacking.
    
        if (attackTypes.includes(playerArray[0]) && attackTypes.includes(playerArray[1])) {


            // if both of them are attacking using elements

            if (Elements.includes(playerArray[0]) && Elements.includes(playerArray[1])) {
                // getting the dominant element/ player
                const elemDom = elementFun(playerArray[0], playerArray[1])
                console.log('element vs element')
                //getting the winner of the trade off.
                var winnerIndex = chance.weighted([elemDom[0], elemDom[1], 2, 3], [(35 * elemDom[2]), 35, 15, 15])
                if (winnerIndex < 2) {
                var speech = phrases.elementVsElement(players[winnerIndex], players[this.otherIndex(winnerIndex)], winnerIndex)
                } else { 
                    var speech = phrases.elementVsElement(player1, player2, winnerIndex)
                }

            // when both players are using physical attacks.
            
            } else if (playerArray[0] === 'attack' && playerArray[1] === 'attack') {
                
                // if both of them use physical attacks
                var winnerIndex = chance.weighted([0, 1, 2, 3], [40, 40, 10, 10])
                var loserIndex = otherIndex(winnerIndex)
                console.log('attack vs attack')

                if (winnerIndex < 2) {
                    
                    // if there is a winner out of the 2
                    var speech = phrases.attackVsAttack(players[winnerIndex], players[otherIndex(winnerIndex)], winnerIndex)
                    
                    //subtracting health from the loser.
                    players[loserIndex].hpSubtract(playerOutputs[winnerIndex])
                
                } else {
                    
                    //getting the winner.
                    var speech = phrases.attackVsAttack(players[0], players[1], winnerIndex)
                    
                    //in the case of both players damaging each other.
                    if (winnerIndex === 3) {
                       
                        players[0].hpSubtract(playerOutputs[1]) 
                        players[1].hpSubtract(playerOutputs[0])
                    }


            // when one is using physical attacks and the other is using elemental attacks.
            
        
            } else {
                
                var attacker = playerArray.indexOf('attack')
                
                var otherPlayer = otherIndex(attacker)
                
                console.log('element vs attack')

                
                //getting the winner index
                
                var winnerIndex = chance.weighted([players[otherPlayer].move, 'attack', 2, 3], [55, 35, 15, 15])
                var loserIndex = otherIndex(winnerIndex)
                var speech = phrases.attackVsElementSpeech(players[attacker], players[otherPlayer], winnerIndex)
                
                if (winnerIndex < 2) {
                    players[loserIndex].hpSubtract(playersOutputs[winnerIndex])
                } else {
                    //in the case of a draw or both players winning

                    var speech = phrases.attackVsAttack(players[0], players[1], winnerIndex)
                        
                    //in the case of both players winning
                    if (winnerIndex == 3) {
                        players[0].hpSubtract(playerOutputs[1]) 
                        players[1].hpSubtract(playerOutputs[0])
                    
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
                
                //getting the probabilities.
                
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
                
                //75% chance of the player blocking some damage, a 25% chance of the player taking the full impace
                var winnerIndex = chance.weighted([passiveIndex, attackerIndex], [75, 25])

                // subtracting only a specific amount of health, not all of it.
                if (winnerIndex === passiveIndex) {
                    
                    //subtracting the damage from the player
                    players[passiveIndex].hpSubtract(Math.floor(playerOutputs[attackerIndex] * (playerOutputs[passiveIndex] / 100)))

                    // generating speech
                    var speech = phrases.dodgeSpeech(playerNames[attackerIndex], playerNames[passiveIndex], playerArray[attackerIndex], true)
                    players[passiveIndex].ppAdd(Math.floor(Math.random() * 5) + 15)
                } else {
                    
                    //subtracting full damage if the player blocks.
                    players[passiveIndex].hpSubtract(playerOutputs[attackerIndex])

                    var speech = phrases.dodgeSpeech(playerNames[attackerIndex], playerNames[passiveIndex], playerArray[attackerIndex], false)
                }

            }


        } else {
            // if both players don't attack or one of the players don't select a move.



        }
        return [players, speech, playerNames[winnerIndex]]


    },
        //the function to display the bars which represent health and power.
    bars: function (barEmoji, point) {
        let newBar = '';
        for (let i = 0; i < (point / 20); i++) {
            newBar += barEmoji
        }
        if (newBar.length < 5) {
            for (let index = newBar.length / 2; index < 5; index++) {
                newBar += '🟥'
            }
        }
        return newBar
    },
    duelEnd: function () {

    }





}
