const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)
        + '.json?access_token=pk.eyJ1Ijoic2Frc2hhbWdvZWwiLCJhIjoiY2t5aTJpb2ZhMHh2NzJvbjhvdGwwdmlmMSJ9.OX_nauwipYiy5YR3NceKMg&limit=1';
    
    request({ url, json: true }, (error, { body } = {}) => {
        if(error) {
            callback('Unable to connect to location services!', undefined);
        } else if(body.message == 'Not Found' || body.features.length == 0) {
            callback('Unable to identify location.', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    })
};

module.exports = geocode;