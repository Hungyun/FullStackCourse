import React, { useState, useEffect } from 'react'
import axios from 'axios'




const Lang = (props) =>{
  return(
    <li>{props.lang}</li>
  )
}
const ShowCountry = (props) =>{
  const country = props.country
  const name = country.name.common
  const capital = country.capital
  const population = country.population
  const languages = Object.values(country.languages)
  const flagUrl = country.flags.png

  return(
    <div>
      <h2>{name}</h2>
      capital {capital}<br/>
      pupulation {population}<br/>
      <h3>Spoken languages</h3>
      <ul>
        {languages.map(lang => <Lang key={lang} lang={lang}/>)}
      </ul>
      <img src={flagUrl} alt="flag of this country" width="100"/><br/>
    </div>
  )
}






const SearchResult = (props) =>{
  if (props.countryList.length>10){
    return(
      'Too many matches, specify another filter'
    )
  }else if(props.countryList.length === 1){
    return(
      <>
      <ShowCountry country={props.countryList[0]}/>
      </>
    )
  }
  else{
  return(
    props.countryList.map(country =>{
      return(
        // <>
        // <li key={country.name.official}>{country.name.common}<button onClick={props.buttonClick} value={country.name.common}>show</button><br/></li>
        
        // </>
        <Country key={country.name.common} country={country} buttonClick={props.buttonClick}/>
      )
    })
  )
  }
}

const Country = (props) =>{
  const country = props.country
  return(
    <li>{country.name.common}<button onClick={props.buttonClick} value={country.name.common}>show</button><br/></li>
  )
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ searchString, setSearchString ] = useState('')
  const [ countriesDetailList, setCountriesDetailList] = useState([])


  useEffect(() => {
    console.log('countries effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        // console.log('promise fulfilled')
        setCountries(response.data)
      })

      // console.log('weahter effect')

      // axios
      // .get('http://api.weatherstack.com/current?access_key='+api_key+'&query='+weather)
      // .then(response=>{
      //   console.log('weather promise fulfulled')
      //   setWeatherData(response.data)
      //   })
    },[])
    
  // console.log('render', countries.length, 'countries')



  const handleSearchString = (event) =>{
    console.log(event.target.value)
    setSearchString(event.target.value)
    // const searchResult = countries.filter(country => country.name.common.toUpperCase().includes(searchString.toUpperCase())===true)
    // if (searchResult.length===1){
    //   setWeather(searchResult[0].capital)
    // }
    setCountriesDetailList([])
    // setSearchResultCountryList(searchResult)
  }
  
  const handleButtonClick = (event) =>{
    console.log(event.target.value)
    setCountriesDetailList(countriesDetailList.concat(event.target.value.toUpperCase()))
    console.log(countriesDetailList)
  }

  const searchResult = countries.filter(country => country.name.common.toUpperCase().includes(searchString.toUpperCase())===true)

  
  return (
    <>
    find countries<input value={searchString} onChange={handleSearchString}/><br/>
    {/* <Countries countriesToShow={countriesToShow}/> */}
    <SearchResult countryList = {searchResult} buttonClick={handleButtonClick}/>
   

    {countries.map(country => {
      if(countriesDetailList.includes(country.name.common.toUpperCase())){
        return(
          <ShowCountry country={country}/>
        )
      }
      else{return null}
    })}

    </>
  )

}

export default App