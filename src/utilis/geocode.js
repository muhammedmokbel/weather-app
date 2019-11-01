
const request = require('request') ; 


const geocode = (location , callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(location) +'.json?access_token=pk.eyJ1IjoibW9oYW1lZG1va2JlbCIsImEiOiJjazIzOTZ4emswMXZrM2lwOTJvYm1jZmFxIn0.lHAugNnEG2b8JzoiuBr6NA&limit=1'

    request( { url , json : true} , (error , { body } = {}) =>{
       
        if(error)
        {
            callback('unable to access the service , please try later ! '); 
        }
        
        else if (!body.features.length)
        {
            
            callback('No location found please search with another term !')
        }
        else 
        {
            callback(undefined , {
                latitude : body.features[0].center[1] , 
                longitude : body.features[0].center[0] , 
                location : body.features[0].place_name 
            })
        }


    } )
}

module.exports = geocode ; 