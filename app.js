var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    request    = require('request');

//app initialization
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/',function(req,res){
  res.render('index');
});

app.post('/getWeather',function(req,res){
  var city = req.body.city;
  var APIurl = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID=cbb1c567abdc54e60fa232b6534113db";
  request(APIurl, function (error, response, body) {
    if(!error && response && response.statusCode == 200){
      var weatherData = JSON.parse(body);
      //console.log(weatherData);
      res.render('showWeather',{
        currentTemp:weatherData.main.temp,
        main : weatherData.weather[0].main,
        description : weatherData.weather[0].description,
        maxTemp : weatherData.main.temp_max,
        minTemp : weatherData.main.temp_min,
        windSpeed : weatherData.wind.speed,
        windDegree : weatherData.wind.deg,
        clouds : weatherData.clouds.all,
        sunrise : weatherData.sys.sunrise,
        sunset : weatherData.sys.sunset,
        city : weatherData.name
      });
    }else{
      console.log(error);
      res.redirect("*");
    }
  });
});

//error 404
app.get('*',function(req,res){
  res.send('/');
});

//app running on port
app.listen(8080,function(){
  console.log('Server running on port 8080');
});
