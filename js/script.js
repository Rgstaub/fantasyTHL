"use strict"


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
let num = 7;
let weeklySheet = {};
let players = [];
let myTeam = "Get Off My Lawn";
let teamSize = 5;

let getSpreadsheet = function() {
    let queryURL =  `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetID}?key=${apiKey}`;
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .done(function(data) {
        console.log(data);
    })
}


let getPlayers = function() {
	players = [];

    let queryURL = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetID}/values/${week}?key=${apiKey}`;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .done(function(data) {
    	console.log("WEEKLY SHEET:")
        console.log(data)
        weeklySheet = data;
        

        // This is the 'sorter' loop. It will run through the full sheet once for each seed, placing
        // players of a common seed into an array
        for (let j = 0; j < teamSize; j++) {
            let seed = [];

            // look through each row of the sheet. Upon your own team, skip ahead to the next team
            for (let i = 0; i < weeklySheet.values.length; i++) {
                if (weeklySheet.values[i][1] === myTeam) {
                    i += teamSize + 1;
                }
  				// if the player on the row matches the seed of the current iteration, create an object 
  				// of the player and put it in the array
                if (weeklySheet.values[i][0] == j+1) {
                    let player = {
                        name: weeklySheet.values[i][1],
                        pr: weeklySheet.values[i][2],
                        opp: weeklySheet.values[i][8],
                        oppPr: weeklySheet.values[i][9],
                        seed: weeklySheet.values[i][0]
                    }
                    seed.push(player);
                } 
            }
            // Put the seed arrays into a larger object of all players
            players.push(seed);
        }
        console.log("PLAYERS:")
        console.log(players);
        drawPlayers();
    })
}


// Update variables from Firebase
db.ref().on('value', function(snap) {
    spreadsheetID = snap.val().spreadsheetID;
    week = snap.val().week;
    getPlayers();

})

// Loop through and draw each seed one by one
let drawPlayers = function() {
	$('#playerPicker').empty();
	for (var i = 0; i < teamSize; i++) {
		let seedWrap = $('<ul>').attr("id", `seed${i+1}`).addClass('seed-header');
		seedWrap.text(`Seed: ${i+1}`);
		$('#playerPicker').append(seedWrap);
		players[i].forEach(function(j) {
			let playerWrap = $('<li>')
			playerWrap.text(j.name);
			seedWrap.append(playerWrap);
		});
	}
	

}