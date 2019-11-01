const request = require('request') ; 

const forecast = (latitude , longitude , callback) => {

    const url = 'https://api.darksky.net/forecast/5453cee3b3a52ae1b54ddd42126720cb/'+encodeURIComponent(latitude)+','+ encodeURIComponent(longitude)+'' ;  

    request( { url , json : true} , (error , {body}= {}) => {
        if (error)
        {
            callback('unable to access the service , please try later ! '); 
        }
        else if (body.error)
        {
            callback('No location found please search with another term !')
        }
        else 
        {
            callback(undefined , {summary :body.currently.summary + " and currently the temperature is " +body.currently.temperature + "in kelvin also the Probability of rain is " + body.currently.precipProbability * 100 +"% "  , icon : body.currently.icon  }) ;
        }
    } )

}


module.exports = forecast ;