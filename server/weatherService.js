const axios = require('axios')

function get(req, res) {
    const { lat, long } = req.params;
    axios({
        method: "get",
        url: "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+long+"&exclude="+/*current,minutely,hourly,alerts*/"&appid=" + process.env.WEATHER_KEY +"&units=imperial",

    }).then(data => {
        res.json(data.data)
    }).catch(err => {
        res.status(500).send(err);
    })
}

module.exports = { get };