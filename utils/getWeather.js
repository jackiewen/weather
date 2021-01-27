const request = require('request');

const getWeather = (id, callback) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?id=${id}&appid=5cbec7211946fc12499902072750e1c9`;
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback(error, undefined);
        } else if (body.cod != 200) {
            callback(body.message, undefined);
        } else {
            
            callback('', body);
        }
    });
}

module.exports = getWeather;