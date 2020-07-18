const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geo = require('./utils/geocode');
const fore = require('./utils/forecast');

//console.log(__dirname);
//console.log(__filename);
//console.log(path.join(__dirname));
//console.log(path.join(__dirname,'../public'));


// define path for express config
const publicDir = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');
const app = express(); 
const port = process.env.PORT || 3000;

//setup handle bar engine and views location
app.set('view engine', 'hbs');
app.set('views',viewPath);
hbs.registerPartials(partialPath);

//set up static directory to serve
app.use(express.static(publicDir));

app.get('',(req,res) => {
    res.render('index',{
        title : 'Weather App',
        name : 'Mounesh Acharya'
    });
}); 

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About Page',
        name  : 'Mounesh Acharya'
    });
});

app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'Help Page',
        name  : 'Mounesh Acharya'
    });
});

// app.get('', (req,res) => {
//     res.send('<h1>weather</h1>');
// });

// app.get('/help',(req,res)=>{
//     res.send([{
//         name : 'mounesh',
//         age : 26
//     },{
//         name :'chennu',
//         age :27
//     }]);
// });

// app.get('/about',(req,res)=>{
//     res.send('<h1>about page</h1>');
// });

app.get('/weather',(req,res)=>{
    const address = req.query.address;
    if(!address){
        return res.send({
            error : 'you must provide a address'
        });
    }


    geo.getGeocode(address, (error,{longitude,latitude,placeName} = {}) => {
        if(error){
            return res.send({
                error
            });
        }else{
            fore.getForecast(longitude, latitude, (error,newresponse) => {
                if(error){
                    return res.send({
                        error
                    });
                }else{
                    res.send({
                        placeName,
                        temperature : newresponse.temperature,
                        cloudover : newresponse.cloudover,
                        humidity : newresponse.humidity
                    });
                }
            });
        }
    });  

    
});

app.get('/products',(req,res) => {

    if(!req.query.search){
        return res.send({
            error : 'you must provide a seach term'
        });
    }

    console.log(req.query.search);
    res.send({
        products : {}
    });
});

app.get('/help/*',(req,res)=>{
    res.render('404',{
        name : 'Mounesh Acharya',
        errorMessage : 'Help article not found'
    });
});

app.get('*', (req,res)=>{
    res.render('404',{
        name : 'Mounesh Acharya',
        errorMessage : 'page not found'
    });
});

app.listen(port, () => {
    console.log('server is up on port '+port);
});


