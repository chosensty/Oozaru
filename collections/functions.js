
module.exports = {
    getTime: function(milliseconds, unitAmount) {
        if(milliseconds === 0) return 'forever'
        function sCheck(value, amount) {
            if (Math.floor(amount) === 1) return value.substring(0, value.length-1)
            else return value;
        }
        let milli = parseInt(milliseconds)
        if (Number.isNaN(milli)) return 'This is not a number.';
        let seconds = milli/1000
        let minutes = seconds /60;
        let hours = minutes/60;
        let days = hours/24;
        let weeks  = days /7;
        let months = days/30;
        let years = months /12;
        let units = ['milliseconds', 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years']
        let times = [milli, seconds, minutes, hours, days, weeks, months, years];
    
    
        for (let i = 1;i<=times.length;i++) {
            const prevIndex = i-1;
            if (times[i]<1) {
                if(times[prevIndex]-Math.floor(times[prevIndex]) === 0) return `${times[prevIndex]} ${sCheck(units[prevIndex], times[prevIndex])} `
                if(!unitAmount) {
                    let otherTimes = times.slice(0, i);
                    let entireTime = '';
                    for (let index = prevIndex;index>=0;index--) {
                        entireTime += `${Math.floor(otherTimes[index])} ${sCheck(units[index], times[index])} `
                        if(times[index]-Math.floor(times[index]) === 0) return entireTime;
                        if (index === 0) return entireTime;
                        percent = (otherTimes[index]-Math.floor(otherTimes[index]))/otherTimes[index]
                        otherTimes = otherTimes.map(time => time*percent);
    
                    }
                } else {
                    unitAmount = parseInt(unitAmount);
                    if(Number.isNaN(unitAmount) || unitAmount>8 || unitAmount<1) return `Give a valid amount of Units (1-8).`;
                    let otherTimes = times.slice(0, i);
                    let entireTime = '';
                    for (let index = prevIndex;index>prevIndex-unitAmount;index--) {
                        entireTime += `${Math.floor(otherTimes[index])} ${sCheck(units[index], times[index])} `
                        if(times[index]-Math.floor(times[index]) === 0) return entireTime;
                        if (index === 0) return entireTime;
                        percent = (otherTimes[index]-Math.floor(otherTimes[index]))/otherTimes[index]
                        otherTimes = otherTimes.map(time => time*percent);
                    }
                    return entireTime;
                }
            }
        }
    },
    getMilli: function(totalTime) {
        // getting the amount of time (1 day = 1)
        if(totalTime === 'forever' || totalTime === 'indefinite') return 0;
        if(totalTime.split(' ').length === 2) {
        let amount = parseInt(totalTime.split(' ')[0]);
        let unit = totalTime.split(' ')[1]
        // finding the multiplier
        if(Number.isNaN(amount)) return `${totalTime.split(' ')[0]} is not a valid number.`
        if(unit.substring(0, 3)==='sec') {
            return amount*1000;
        } else if (unit.substring(0, 3) ==='min') {
            return amount*1000*60;
        } else if (unit.substring(0, 4) ==='hour') {
            return amount*1000*60*60;
        } else if (unit.substring(0, 3) === 'day') {
            return amount*1000*60*60*24;
        } else if (unit.substring(0, 4) === 'week'){
            return amount*1000*60*60*24*7;
        } else if (unit.substring(0, 5) === 'month'){
            return amount*1000*60*60*24*30;
        } else if (unit.substring(0, 4) === 'year'){
            return amount*1000*60*60*24*365;
        } else if(unit) {
            return `${unit} is not a valid unit for time.`
        }
    }
    let totalMs = 0;
    if(totalTime.split(' ').length%2!==0) return 'Invalid length'
    for(let i = 0;i<totalTime.split(' ').length/2;i+=2) {
        let amount = parseInt(totalTime.split(' ')[i]);
        let unit =  totalTime.split(' ')[i+1]
        if(Number.isNaN(amount)) return `${totalTime.split(' ')[i]} is not a valid number.`
        if(unit.substring(0, 3)==='sec') {
            totalMs += amount*1000;
        } else if (unit.substring(0, 3) ==='min') {
            totalMs += amount*1000*60;
        } else if (unit.substring(0, 4) ==='hour') {
            totalMs += amount*1000*60*60;
        } else if (unit.substring(0, 3) === 'day') {
            totalMs += amount*1000*60*60*24;
        } else if (unit.substring(0, 4) === 'week'){
            totalMs += amount*1000*60*60*24*7;
        } else if (unit.substring(0, 5) === 'month'){
            totalMs +=  amount*1000*60*60*24*30;
        } else if (unit.substring(0, 4) === 'year'){
            totalMs += amount*1000*60*60*24*365;
        } else {
            return `${unit} is not a valid unit for time.`
        }
    }; return totalMs
    
    },
    colourNameToHex: function(colour) {
        {
            var colours = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
            "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
            "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
            "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
            "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
            "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
            "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
            "gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
            "honeydew":"#f0fff0","hotpink":"#ff69b4",
            "indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
            "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
            "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
            "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
            "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
            "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
            "navajowhite":"#ffdead","navy":"#000080",
            "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
            "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
            "rebeccapurple":"#663399","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
            "saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
            "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
            "violet":"#ee82ee",
            "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
            "yellow":"#ffff00","yellowgreen":"#9acd32"};
        
            if (typeof colours[colour.toLowerCase()] != 'undefined')
                return colours[colour.toLowerCase()];
        
            return false;
        }
    }
    
}