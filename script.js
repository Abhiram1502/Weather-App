async function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = 'your_api_key_here';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const res = await fetch(url);
    if (res.ok) {
        const data = await res.json();
        document.getElementById('weather').innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>${data.weather[0].description}</p>
            <h3>${data.main.temp}°C</h3>
        `;
    } else {
        document.getElementById('weather').innerHTML = '<p>City not found. Try again.</p>';
    }
}