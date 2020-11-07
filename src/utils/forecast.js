const got = require("got");

const forecast = (long, lat, callback) => {
    const url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&appid=2dddfa3511e8a8735cf02333855ce2ec&units=metric";
    (async () => {
        try {
            const response = await got(url, { responseType: "json" });

            callback(undefined, {
                temp: response.body.current.temp,
                weatherType: response.body.current.weather[0].description
            });

        }
        catch (error) {
            if (error.response) {
                if (error.response.body.cod) {
                    callback('Unable to find the location', undefined);
                }
            }

            else {
                callback('Unable to connect to weather service. Check your internet connection!', undefined);
            }
        }
    })();
}

module.exports = forecast;