// Weather icons based on condition
function getWeatherIcon(condition) {
  const icons = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Drizzle': '🌦️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Mist': '🌫️',
    'Fog': '🌫️',
    'Haze': '🌫️'
  }
  return icons[condition] || '🌤️'
}

// Fetch weather from our backend
async function getWeather() {
  const city = document.getElementById('cityInput').value.trim()
  const errorMsg = document.getElementById('errorMsg')
  const weatherCard = document.getElementById('weatherCard')

  // clear old error
  errorMsg.textContent = ''

  if (!city) {
    errorMsg.textContent = 'Please enter a city name!'
    return
  }

  try {
    const response = await fetch(`/api/weather?city=${city}`)
    const data = await response.json()

    if (data.error) {
      errorMsg.textContent = data.error
      weatherCard.classList.remove('show')
      return
    }

    // Fill in the weather data
    document.getElementById('cityName').textContent = data.name
    document.getElementById('countryName').textContent = data.sys.country
    document.getElementById('temp').textContent = Math.round(data.main.temp)
    document.getElementById('description').textContent = data.weather[0].description
    document.getElementById('humidity').textContent = data.main.humidity + '%'
    document.getElementById('wind').textContent = Math.round(data.wind.speed * 3.6) + ' km/h'
    document.getElementById('feelsLike').textContent = Math.round(data.main.feels_like) + '°C'
    document.getElementById('weatherIcon').textContent = getWeatherIcon(data.weather[0].main)

    // show the weather card
    weatherCard.classList.add('show')

  } catch (error) {
    errorMsg.textContent = 'Something went wrong. Try again!'
  }
}

// Search button click
document.getElementById('searchBtn').addEventListener('click', getWeather)

// Press Enter to search
document.getElementById('cityInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') getWeather()
})