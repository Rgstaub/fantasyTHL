"use strict"


// Initialize Firebase
var config = {
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
let testObj = {};
let players = [];
let myTeam = "Team Rank 5";
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
    let queryURL = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetID}/values/${week}?key=${apiKey}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .done(function(data) {
        console.log(data)
        testObj = data;
        
        for (var j = 0; j < teamSize; j++) {
            let seed = [];
            // look through each row. If the row has "1" in column A, add the player for that row into the array of 1 seeds
            // If the team name matches my own team, skip down 5 lines
            for (var i = 0; i < testObj.values.length; i++) {
                if (testObj.values[i][1] === myTeam) {
                    i += 5;
                }
                if (testObj.values[i][0] === j+1) {
                    var player = {
                        name: testObj.values[i][1],
                        pr: testObj.values[i][2],
                        opp: testObj.values[i][8],
                        oppPr: testObj.values[i][9]
                    }
                    seed.push(player);
                }
                
            }
            players.push(seed);
            console.log(seed);
        }
        console.log(players);
    })
}

db.ref().on('value', function(snap) {
    spreadsheetID = snap.val().spreadsheetID;
    week = snap.val().week;
    getPlayers();
})

