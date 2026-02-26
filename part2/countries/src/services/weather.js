import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'

const getWeather = (cityName, weatherApiKey) => {
    const request = axios.get(`${baseUrl}q=${cityName}&appid=${weatherApiKey}&units=metric`)
    return request.then(response => response.data)
}

export default {getWeather}