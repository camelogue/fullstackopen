import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import ContentArea from './components/ContentArea'

import countryService from './services/countries'
import weatherService from './services/weather'


const App = () => {
  const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY

  const [keyword, setKeyword] = useState('')
  const [countries, setCountries] = useState(null)
  const [chosenCountry, setChosenCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countryService
    .getAll()
    .then(allCountries => { 
      setCountries(allCountries)
    })
  }, [])

  useEffect(() => {
    if (chosenCountry){    
      weatherService
      .getWeather(chosenCountry.capital[0], weatherApiKey)
      .then(weather => {
        setWeather(weather)
      })
    }
  }, [chosenCountry])

  const countriesToShow = countries ? countries.filter(country => country.name.common.toLowerCase().search(keyword.toLowerCase()) !== -1) : []

  useEffect(() => {
    if (countriesToShow.length === 1) {
      setChosenCountry(countriesToShow[0])
    }
  }, [countriesToShow.length])

  if (!countries) return null

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value)
    setChosenCountry(null)
  }

  const handleShowCountry = (country) => {
    setChosenCountry(country)
  }

  return (
    <div>
      find countries <Filter value={keyword} handleKeywordChange={handleKeywordChange} />
      <ContentArea countries={chosenCountry ? [chosenCountry] : countriesToShow} setChosenCountry={setChosenCountry} weather={weather} onShow={handleShowCountry} />
    </div>
  )
}

export default App