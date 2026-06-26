const API = '/api/weather'

function getWeatherIcon(condition) {
  const icons = {
    'Clear': '☀️', 'Clouds': '☁️', 'Rain': '🌧️',
    'Drizzle': '🌦️', 'Thunderstorm': '⛈️',
    'Snow': '❄️', 'Mist': '🌫️', 'Fog': '🌫️', 'Haze': '🌫️'
  }
  return icons[condition] || '🌤️'
}

async function getWeather() {
  const city = document.getElementById('cityInput').value.trim()
  const errorMsg = document.getElementById('errorMsg')
  const weatherContent = document.getElementById('weatherContent')
  const emptyState = document.getElementById('emptyState')

  errorMsg.textContent = ''

  if (!city) {
    errorMsg.textContent = 'Please enter a city name!'
    return
  }

  try {
    const response = await fetch(`${API}?city=${city}`)
    const data = await response.json()

    if (data.error) {
      errorMsg.textContent = data.error
      weatherContent.classList.add('hidden')
      emptyState.classList.remove('hidden')
      return
    }

    document.getElementById('cityName').textContent = data.name
    document.getElementById('countryName').textContent = data.sys.country
    document.getElementById('temp').textContent = Math.round(data.main.temp)
    document.getElementById('description').textContent =
      data.weather[0].description + ' · Feels like ' + Math.round(data.main.feels_like) + '°'
    document.getElementById('humidity').textContent = data.main.humidity + '%'
    document.getElementById('wind').textContent = Math.round(data.wind.speed * 3.6) + ' km/h'
    document.getElementById('feelsLike').textContent = Math.round(data.main.feels_like) + '°'
    document.getElementById('weatherIcon').textContent = getWeatherIcon(data.weather[0].main)
    document.getElementById('locationLabel').textContent = data.name + ', ' + data.sys.country

    weatherContent.classList.remove('hidden')
    emptyState.classList.add('hidden')

  } catch (error) {
    errorMsg.textContent = 'Something went wrong. Try again!'
  }
}

// Live clock
function updateClock() {
  const now = new Date()
  const h = now.getHours().toString().padStart(2, '0')
  const m = now.getMinutes().toString().padStart(2, '0')
  document.getElementById('clock').textContent = h + ':' + m
}
updateClock()
setInterval(updateClock, 1000)

document.getElementById('searchBtn').addEventListener('click', getWeather)
document.getElementById('cityInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') getWeather()
})