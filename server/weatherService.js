const axios = require('axios')

function get(req, res) {
    axios({
        method: "get",
        url: "https://api.openweathermap.org/data/2.5/onecall?lat=43.2128&lon=-75.4557&exclude="+/*current,minutely,hourly,alerts*/"&appid=" + process.env.WEATHER_KEY +"&units=imperial",

    }).then(data => {
        res.json(data.data)
    }).catch(err => {
        res.status(500).send(err);
    })
}

module.exports = { get };