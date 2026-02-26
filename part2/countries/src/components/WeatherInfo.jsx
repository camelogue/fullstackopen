const WeatherInfo = ({weather}) => {
    return (
        <div>
            <h2>Weather in {weather.name}</h2>
            <p>Temperature {weather.main.temp} Celcius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
            <p>Wind {weather.wind.speed} m/s</p>
        </div>
    )
}

export default WeatherInfo