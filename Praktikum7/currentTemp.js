const https = require('https');

function getCurrentTemperature(city) {
    const url = `https://wttr.in/${city.replace(/ /g, '+')}?format=%t`;

    https.get(url, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            if (response.statusCode === 200) {
                const temperature = data.trim();
                console.log(`${city}: ${temperature}`);
            } else {
                console.error(`Fehler beim Abrufen der Temperatur für ${city}.`);
            }
        });
    });
}

if (process.argv.length < 3) {
    console.log('Verwendung: node currentTemp.js <Ort>');
} else {
    const city = process.argv[2];
    getCurrentTemperature(city);
}
