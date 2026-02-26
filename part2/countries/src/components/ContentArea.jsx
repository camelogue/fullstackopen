import CountryInfo from './CountryInfo'

const ContentArea = ({countries, onShow}) => {
    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    } else if (countries.length > 1) {
        return (
            <div>
                {countries.map(country => 
                <div key={country.name.common}>
                    {country.name.common} <button onClick={() => onShow(country)}>Show</button>
                </div>
                )}
            </div>
        )
    } else if (countries.length === 1) {
        return (
            <div>
                <CountryInfo country={countries[0]} />
            </div>
        )
    } else 
    return <p>No match</p>
}

export default ContentArea