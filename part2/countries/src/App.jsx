import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import ContentArea from './components/ContentArea'

import countryService from './services/countries'


const App = () => {
  const [keyword, setKeyword] = useState('')
  const [countries, setCountries] = useState(null)
  const [chosenCountry, setChosenCountry] = useState(null)

  useEffect(() => {
    countryService
    .getAll()
    .then(allCountries => {
      setCountries(allCountries)
    })
  }, [])

  if (!countries) return null

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().search(keyword.toLowerCase()) !== -1)

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
      <ContentArea countries={chosenCountry ? [chosenCountry] : countriesToShow} onShow={handleShowCountry} />
    </div>
  )
}

export default App