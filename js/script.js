

const apiKey = "AIzaSyAil2fLaeuR0RTx_pJOzBtghvqE856E_Bc";

let spreadsheetObj = {};

let spreadsheetID = "1azyTuUPH2BxNwoKlkHp2HkJEbspIKgKugirm8V4A0cM"

let getSpreadsheet  = function() {
    let queryURL = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetID}?key=${apiKey}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .done(function(data) {
        console.log(data);
        spreadsheetObj = data;
    })
}

