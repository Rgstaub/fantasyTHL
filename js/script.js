// Google Spreadsheets API key:  AIzaSyAil2fLaeuR0RTx_pJOzBtghvqE856E_Bc

const apiKey = "AIzaSyAil2fLaeuR0RTx_pJOzBtghvqE856E_Bc";

let spreadsheetID = "1azyTuUPH2BxNwoKlkHp2HkJEbspIKgKugirm8V4A0cM"

function testAPI() {
    let queryURL = "https://sheets.googleapis.com/v4/spreadsheets/1azyTuUPH2BxNwoKlkHp2HkJEbspIKgKugirm8V4A0cM";

    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .done(function(data) {
        console.log(data);
    })
}