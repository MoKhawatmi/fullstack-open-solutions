import {useState, useEffect} from 'react'
import axios from 'axios'

const Search=(props=>{
  return (
    <div>
      Country name: <input type="text" onChange={props.handleSearch}/>
    </div>
  )
})

const SearchResults=(props=>{
  return(
    <ul>
        {props.resultNames.map(name=>{
          return <li key={name}>{name} <button onClick={()=>{props.handleClick(name)}}>Show</button></li>
        })}
    </ul>
  )
})

const Country=(({country})=>{
  return(
    <div>
      <h1>{country.name}</h1>

      <p>
        Capital: {country.capital} <br/>
        Population: {country.population}
      </p>

      <h3>Languages</h3>
      <ul>
        {country.languages.map(language=>{
          return <li key={language.iso639_1}>{language.name}</li>
        })}
      </ul>

      <img height="150" width="150" src={country.flag}/>
    </div>
  )
})

function App() {

  let [allCountries, setAllCountries]=useState([]);
  let [names,setNames]=useState([]);
  let [resultNames,setResultNames]=useState([]);
  let [country,setCountry]=useState({});
  let [viewMode,setViewMode]=useState(false);


  useEffect(()=>{
    axios.get("https://restcountries.eu/rest/v2/all").then(result=>{
      let countryNames=[];
      console.log(result.data);
      setAllCountries(result.data);
      result.data.forEach(object=>{
        countryNames.push(object.name.toLowerCase());
      })
      setNames(countryNames);
    });
  },[])

  function handleClick(name){
    findCountryObject(name);
  }


  function handleSearch(e){
    console.log(e.target.value);
    setResultNames([]);
    setViewMode(false);
    let resultNames=names.filter(name=>{
      return name.includes(e.target.value);
    })
    setResultNames(resultNames);
    if(resultNames.length==1){
      findCountryObject(resultNames[0]);
    }
    if(e.target.value==""){
      setResultNames([]);
    }
  }

  function findCountryObject(name){
    let object=allCountries.find(country=>{
      return country.name.toLowerCase()==name.toLowerCase();
    })
    setCountry(object);
    console.log(country);
    setViewMode(true);
  }

  return (
    <div>
      <Search handleSearch={handleSearch} />
      {resultNames.length>10 && <div>Too many results</div>}
      {resultNames.length<=10 && resultNames.length!=1 && <SearchResults resultNames={resultNames} handleClick={handleClick} />}
      {viewMode && <Country country={country} />}
      
    </div>
  );
}

export default App;
