"use strict"

const apiKey = "AIzaSyAil2fLaeuR0RTx_pJOzBtghvqE856E_Bc";
let spreadsheetID = "1azyTuUPH2BxNwoKlkHp2HkJEbspIKgKugirm8V4A0cM"
let testString = "https://sheets.googleapis.com/v4/spreadsheets/1azyTuUPH2BxNwoKlkHp2HkJEbspIKgKugirm8V4A0cM/values/'Week 8'!B4?key=AIzaSyAil2fLaeuR0RTx_pJOzBtghvqE856E_Bc";
let week = "Week 8"
let testObj = {};
let seed1 = [];
let myTeam = "Team Rank 5";

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

getSpreadsheet();

let getPlayers = function() {
    let queryURL = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetID}/values/${week}?key=${apiKey}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .done(function(data) {
        console.log(data);
        testObj = data;
        
        // look through each row. If the row has "1" in column A, add the player for that row into the array of 1 seeds
        // If the team name matches my own team, skip down 5 lines
        for (var i = 0; i < testObj.values.length; i++) {
            if (testObj.values[i][1] === myTeam) {
                i += 5;
            }
            if (testObj.values[i][0] === "1") {
                seed1.push(testObj.values[i][1]);
            }
        }
    })
}