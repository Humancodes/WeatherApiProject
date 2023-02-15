require("dotenv").config();
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();



app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function (req,res){
    
    res.sendFile(__dirname + "/index.html");
});

app.post("/",function (req,res){
    const countryName = req.body.country;
    const apiKey = process.env.API_KEY;      //Use your own Api key here
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+countryName+"&appid="+apiKey+"&units="+unit;
    https.get(url,function (response) {
        response.on("data",function (data) {
           const weatherData = JSON.parse(data);  
           const temp = weatherData.main.temp;         
           const weatherDescription = weatherData.weather[0].description;
           const Icon = weatherData.weather[0].icon;
           const IconUrl = "http://openweathermap.org/img/wn/"+Icon+"@2x.png"
           res.write("<h1>The Weather is "+weatherDescription + " Today</h1>");
           res.write("<h1>The temprature in "+countryName+" is "+ temp +" Degrees Celcius.</h1>"); 
           res.write("<img src =" + IconUrl +"></img>");
           res.send(); 
        });
    });
});
 

app.listen(3000,function () {
    console.log("Server running on port 3000");
});





















