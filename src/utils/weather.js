const request = require('request')
const errorCodes = require('./errorCodes')
const log = console.log

//weather stack details
const ws_access_key = 'cea64f057b2b47c1661199e2aa55fcc4'
const ws_url = 'http://api.weatherstack.com'


const weather = (lat, lon, callback) => {
let ws_query = '&query=' + lat + ',' + lon + '&units=m'
let ws_uri = ws_url + '/current?access_key=' + ws_access_key + ws_query
 
  log('ws_uri->', ws_uri)
  request({ url: ws_uri, json: true }, (error, response) => {
    //  const body = JSON.parse(response.body)
    //log(response.body.current)

    if (error) {
     // log('Error in fetching weather details 1', error)
      callback(errorCodes.errMsg1, errorCodes.undef)
    }
    else if (response.body.success === false) {
      //log(response.body.error)
      callback(response.body.error.info, errorCodes.undef)
    }
    else {
      let current = response.body.current
      let msg = `${current.weather_descriptions[0]} .
It is currently ${current.temperature} degrees and it feels like ${current.feelslike} degrees.
Humidity is ${current.humidity}`;

    //   log(current.weather_descriptions[0] + ' .It is currently ' + current.temperature +
    //     ' degrees and it feels like ' + current.feelslike + ' degrees')
        callback(errorCodes.undef, msg)
    }

  })
}

module.exports = weather
