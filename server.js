const express = require('express')
const fetch = require('node-fetch')
require('dotenv').config()

const app = express()

app.use(express.static('public'))
app.use(express.json())

// Weather API route
app.get('/api/weather', async (req, res) => {
  const city = req.query.city        // get city name from request
  const API_KEY = process.env.WEATHER_API_KEY  // get key from .env

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    )
    const data = await response.json()

    if (data.cod !== 200) {
      return res.status(404).json({ error: 'City not found!' })
    }

    res.json(data)   // send weather data to frontend

  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' })
  }
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})