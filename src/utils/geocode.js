const got = require("got");

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?limit=1&access_token=pk.eyJ1IjoidG9vYmFhbGkxIiwiYSI6ImNrOWI4ZDIxaTAxeDQzbXF2bjJsY2Vmc3gifQ.uyiMT3ySQ_25AaCyzMtecQ";

    (async () => {
        try {
            const response = await got(url, { responseType: 'json' });

            if (response.body.features.length === 0) {
                callback('Unable to find location. Try again with some other search term', undefined);
            }


            else {
                callback(undefined, {
                    long: response.body.features[0].center[0],
                    lat: response.body.features[0].center[1],
                    place: response.body.features[0].place_name
                });
            }
        }
        catch (error) {
            callback('Unable to connect to location service. Check your internet connection!', undefined);
        }
    })();
}

module.exports = geocode;