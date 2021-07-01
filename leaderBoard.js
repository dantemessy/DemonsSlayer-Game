const { google } = require('googleapis');

let spreadsheetId = "1vfGK9TvVxX6F1whRvQHRnJIMPIyaDslm3ENdSSiINak";

async function getGoogleSheet() {

    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    })
    const client = await auth.getClient();

    // Instance of Google Sheets API
    return google.sheets({ version: "v4", auth: client });
}


async function getTopPlayers() {

    const googleSheets = await getGoogleSheet();
    const rows = await googleSheets.spreadsheets.values.get({
        spreadsheetId,
        range: "Sheet2!A1:B5",
    });

    let topFive = [];
    rows.data.values.forEach(element => {
        topFive.push({
            name: element[0],
            score: element[1]
        })
    });

    console.log(topFive);

    return topFive;
}


async function submitScore(score){

    const googleSheets = await getGoogleSheet();
    const rows = await googleSheets.spreadsheets.values.append({
        spreadsheetId,
        range: "Sheet1!B:C",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[score.name, score.time]]
        }
    });

    console.log(rows);

}

// submitScore({name:"newton", time: 18.67});
// getTopPlayers()

module.exports= {getTopPlayers};