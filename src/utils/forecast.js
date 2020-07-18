const request = require('request');

const getForecast = (longitude,latitude,callback) => {
    
   const url = 'http://api.weatherstack.com/current?access_key=903b507b5deb8faabc5221606168bf79&query=' + encodeURIComponent(longitude) +',' + encodeURIComponent(latitude) +'&units=f';
   
   request({
       url,
       json : true
   }, (error,{ body }) => {
       if(error){
           callback('unable to load the location service',undefined);
       } else if(!body.current){
           callback('unable to load the lcoation service, try another search',undefined);
       } else{
           callback(undefined,{
               temperature : body.current.temperature,
               cloudover : body.current.cloudcover,
               humidity :  body.current.humidity
           });
       }
  
   });

};

module.exports = {
   getForecast : getForecast
}