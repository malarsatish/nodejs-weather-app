const request = require('request')
const errorCodes = require('./errorCodes')

const log = console.log


const geocode = (location, callback) => {
    //map box details
    const mb_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + location + '.json?access_token='
    const mb_accessToken = 'pk.eyJ1IjoibWFsYXJzYXRpc2giLCJhIjoiY2tkNTU5NzhvMWNybDJ6bnd1djR6YW5jMCJ9.56oaIRTZkJeUOI3bDy2mJA'
    const mb_resultLimit = 1
    const url = mb_url + mb_accessToken + '&limit=' + mb_resultLimit
    
    let lon 
    let lat 
    let loc 

    let data = {
        lat ,
        lon ,
        loc 
      }

    /*
    https://api.mapbox.com/geocoding/v5/mapbox.places/Reading.json?access_token=pk.eyJ1Ijoic2VhcmNoLW1hY2hpbmUtdXNlci0xIiwiYSI6ImNrN2Y1Nmp4YjB3aG4zZ253YnJoY21kbzkifQ.JM5ZeqwEEm-Tonrk5wOOMw&cachebuster=1595893295387&autocomplete=true&limit=1
    */
    //log('mb_uri->', url)
    request({ url, json: true }, (error, {body} = {}) => {
     // log(response.body.features[0].center)
  
      if (error) {
        callback(errorCodes.errMsg1, data)
      }
      else {
        if(!body.features){
          let errMsg2 = 'Location2 ' + location + ' not found. Search with a new location'
          callback(errMsg2, data)
        }else {
          if (body.features.length > 0) {
            lon = body.features[0].center[0]
            lat = body.features[0].center[1]
            loc = body.features[0].place_name
    
            data = {
              lat ,
              lon ,
              loc 
            }
            callback(errorCodes.undef, data)
          } else {
            let errMsg2 = 'Location ' + location + ' not found. Search with a new location'
            callback(errMsg2, data)
          }
        }
      } 
    })
  }

module.exports = geocode
