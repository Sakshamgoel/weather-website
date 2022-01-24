const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c5332c68e40888f904260fa9404e3884&query='
    + latitude + ',' + longitude;

    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback('Unable to connect to Weather Services!', undefined);
        } else if(body.error) {
            callback('Unable to identify location!', undefined);
        } else {
            callback(undefined, body.current);
        }
    })
}

module.exports = forecast;