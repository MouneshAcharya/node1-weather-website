 const request = require('request');

 const getGeocode = (address,callback) => {
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibW91bmVzaGFjaGFyeWEiLCJhIjoiY2s1MmFkcmJuMDZvNjNocW5xbHl1N2tubCJ9.RehLD-U9MSEs66yigmfR8A&limit=1';
    
    request({
        url,
        json : true
    }, (error,{body}) => {

        if(error){
            callback('unable to load the location service',undefined);
        } else if(body.features.length === 0){
            callback('unable to load the lcoation service, try another search',undefined);
        } else{
            callback(undefined,{
                longitude : body.features[0].center[0],
                latitude : body.features[0].center[1],
                placeName : body.features[0].place_name
            });
        }
   
    });

 };

module.exports = {
    getGeocode : getGeocode
}