"use strict"

const keys = require('./keys.js');

// Initialize Firebase
let config = {
apiKey: "AIzaSyASyHthEj5hPCEfRWlnFJyklf2DLIst20s",
authDomain: "optimum-column-174720.firebaseapp.com",
databaseURL: "https://optimum-column-174720.firebaseio.com",
projectId: "optimum-column-174720",
storageBucket: "optimum-column-174720.appspot.com",
messagingSenderId: "884276713189"
};
firebase.initializeApp(config);

const db = firebase.database();

const apiKey = "AIzaSyAil2fLaeuR0RTx_pJOzBtghvqE856E_Bc";
let spreadsheetID = "1azyTuUPH2BxNwoKlkHp2HkJEbspIKgKugirm8V4A0cM"
let week = "Week 8"


let players = [];
let myTHLteam = "Get Off My Lawn";
let teamSize = 5;
let prCap = 1800;

let Players = function() {
	this.players = [];

    let queryURL = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetID}/values/${week}?key=${apiKey}`;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .done(function(data) {
    	console.log("WEEKLY SHEET:")
        console.log(data)
        weeklySheet = data;
        let oppArr = [];
        let opposingTeamArr = [];

        // Build an array to refernce which row each player exists on
        for (let k = 0; k < weeklySheet.values.length; k++) {
            // Build an array to refernce which row each player exists on
            oppArr.push(weeklySheet.values[k][1]);
            // Build an array to refernce which row each opposing team exists on
            opposingTeamArr.push(weeklySheet.values[k][8])
        }

        let opposingTeamPos = opposingTeamArr.indexOf(myTHLteam);
        // This is the 'sorter' loop. It will run through the full sheet once for each seed, placing
        // players of a common seed into an array
        for (let j = 0; j < teamSize; j++) {
            let seed = [];

            // look through each row of the sheet. Upon your own team, skip ahead to the next team
            for (let i = 0; i < weeklySheet.values.length; i++) {
                if (weeklySheet.values[i][1] === myTHLteam) {
                    i += teamSize + 1;
                } else if (i === opposingTeamPos) {
                    i += teamSize + 1;
                }
  				// if the player on the row matches the seed of the current iteration, create an object 
  				// of the player and put it in the array
                if (weeklySheet.values[i][0] == j+1) {
                    // find which row the Opponent is on
                    let opponentPos = oppArr.indexOf(weeklySheet.values[i][8])
                    // Create the player object with all relevant data stored within
                    let player = {
                        name: weeklySheet.values[i][1],
                        pr: weeklySheet.values[i][2],
                        seed: weeklySheet.values[i][0],
                        class1: weeklySheet.values[i][4],
                        class2: weeklySheet.values[i][5],
                        class3: weeklySheet.values[i][6],
                        class4: weeklySheet.values[i][7],
                        opp: weeklySheet.values[i][8],
                        oppPr: weeklySheet.values[i][9],
                        oppClass1: weeklySheet.values[opponentPos][4],
                        oppClass2: weeklySheet.values[opponentPos][5],
                        oppClass3: weeklySheet.values[opponentPos][6],
                        oppClass4: weeklySheet.values[opponentPos][7],
                        score: weeklySheet.values[i][13]
                    }
                    // Put the newly formed player object into an array of all the players in the current seed
                    seed.push(player);
                } 
            }
            // Put the seed arrays into a larger object of all players
            players.push(seed);
        }
        console.log("PLAYERS:")
        console.log(players);
        // Once the players are retrieved and sorted, add them to the DOM
        drawPlayers();
    })
}