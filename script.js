var city=document.getElementById('city');
var button=document.getElementById('search');
const api_key='0018c677bdfd1f236057f989048990e7';
var today=document.querySelector('.today');
var date=new Date();
var hourCard=document.querySelectorAll('.weather-card');
var dayCard=document.querySelectorAll('.day-card');
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const month=["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"]
today.innerHTML=`${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()} , ${days[date.getDay()]}`;

function convertTime(time){
    const date=new Date(time*1000);
    const hours=date.getHours();
    const minutes=date.getMinutes().toString().padStart(2,"0");
    const ampm=hours>=12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${ampm}`;
}
//It will work when we click enter button
city.addEventListener("keypress",function(event){
    if(event.key==="Enter"){
        cityName=city.value.trim();
        city.value='';
        const api_url=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=metric`;
        const geoApi_url=`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
        const forecast_url=`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${api_key}`;
        fetchWeather(api_url,geoApi_url,forecast_url);
    }
})


button.addEventListener('click',function(){
    cityName=city.value.trim();
    city.value='';
    const api_url=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=metric`;
    const geoApi_url=`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
    const forecast_url=`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${api_key}`;
    fetchWeather(api_url,geoApi_url,forecast_url);
})

function fetchWeather(api_url,geoApi_url,forecast_url){
    fetch(api_url)
    .then(response => response.json())
    .then(data => {
        document.getElementById('condition').innerHTML=data['weather'][0]['description'];
        var weather=data['weather'][0]['description'];
        console.log(weather);
        updateBackground(weather);
        document.getElementById('temp').innerHTML=data['main']['temp'];
        document.querySelector('.sunrise span').innerHTML=convertTime(data['sys']['sunrise']);
        document.querySelector('.sunset span').innerHTML=convertTime(data['sys']['sunset']);
        document.querySelector('.feel-content span').innerHTML=`${data['main']['feels_like']} °C`;
        document.querySelector('.humidity-content span').innerHTML=`${data['main']['humidity']} %`;
        document.querySelector('.wind-content span').innerHTML=`${data['wind']['speed']} m/s`;
        document.querySelector('.pressure-content span').innerHTML=`${data['main']['pressure']} hPa`;
        var visibleKm=(data['visibility']/1000).toFixed(1);
        document.querySelector('.visible-content span').innerHTML=`${visibleKm} km`;
        document.querySelector('.rain-content span').innerHTML=data['rain']?.['1h']? `${data['rain']['1h']} mm`: 'No Rain Data';
        console.log(data);
    })
    fetch(geoApi_url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementById('location').innerHTML=`${data[0]['name']} , ${data[0]['state']} , ${data[0]['country']}`;
    })
    .catch(err => {
        //alert("Location Not found");
        //deafult();
    });
    fetch(forecast_url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        for(var i=0;i<16;i++){
            hourCard[i].innerHTML=`<p>${convertTime(data['list'][i]['dt'])}</p>
                        <img src="https://openweathermap.org/img/wn/${data['list'][i]['weather'][0]['icon']}@2x.png" alt="" height="55px" width="55px">
                        <p>${data['list'][i]['main']['temp']} °C</p>`;
        }
        var j=0;
        for(var i=0;i<40;i++){
            if(data['list'][i]['dt_txt'].includes('12:00:00')){
                let [datePart,timePart]=data['list'][i]['dt_txt'].split(" ");
                let dateObj=new Date(datePart);
                dayCard[j].innerHTML=`<img src="https://openweathermap.org/img/wn/${data['list'][i]['weather'][0]['icon']}@2x.png" alt="" height="55px" width="55px">
                            <p>${data['list'][i]['main']['temp']} °C</p>
                            <p>${dateObj.getDate()+' '+month[dateObj.getMonth()]}</p>
                            <p>${days[dateObj.getDay()]}</p>`;
                j++;
            }
        }
        
    })
    .catch(err => {
        //alert("Forecast Not found");
        for(var i=0;i<16;i++){
            hourCard[i].innerHTML=`<p>9AM</p>
                        <img src="images/cloud.webp" alt="" height="40px" width="40px">
                        <p>__°C</p>`;
        }
        var j=0;
        for(var j=0;j<5;j++){
            dayCard[j].innerHTML=`<img src="images/cloud.webp" height="55px" width="55px" alt="">
                            <p>__°C</p>
                            <p>3 March</p>
                            <p>Monday</p>`;
        }
    });
}


function deafult(){
    const api_url=`https://api.openweathermap.org/data/2.5/weather?q=amaravati&appid=${api_key}&units=metric`;
    const geoApi_url=`http://api.openweathermap.org/geo/1.0/direct?q=amaravati&limit=1&appid=${api_key}`;
    const forecast_url=`https://api.openweathermap.org/data/2.5/forecast?q=amaravati&units=metric&appid=${api_key}`;
    fetchWeather(api_url,geoApi_url,forecast_url);
}

deafult();

function updateBackground(condition) {
    let imageUrl = "";
    
    switch (condition.toLowerCase()) {
        case "clear sky":
            imageUrl = "images/sunny.gif";
            break;
        case "clouds":
            imageUrl = "images/cloudy.png";
            break;
        case "rain":
            imageUrl = "images/light rain.png";
            break;
        case "thunderstorm":
            imageUrl = "images/Heavy rain.png";
            break;
        case "snow":
            imageUrl = "images/snow.png";
            break;
        case "mist":
        case "fog":
            imageUrl = "images/mistfog.png";
            break;
        case "drizzle":
            imageUrl = "images/windy.png";
            break;
        default:
            imageUrl = "images/default.gif";
    }

    document.getElementById('currWeather').src = imageUrl;
}




















