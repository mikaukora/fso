import React, { useState, useEffect } from "react";

import axios from "axios";

const Weather = ({ country }) => {
  const [weather, setWeather] = useState("");

  console.log("country", country);

  useEffect(() => {
    const params = {
      appid: process.env.REACT_APP_OPENWEATHER_API_KEY,
      q: country.capital,
      units: "metric",
    };

    axios
      .get("https://api.openweathermap.org/data/2.5/weather", { params })
      .then((response) => setWeather(response.data))
      .catch((error) => {
        console.log(error);
      });
  }, [country]);

  return (
    <div>
      {weather && (
        <div>
          <h2>Weather in {weather.name}</h2>

          <div>
            <h3>temperature</h3>
            {weather.main.temp} Celcius
          </div>

          <div>
            <h3>wind</h3>
            {weather.wind.speed} m/s from direction {weather.wind.deg}
          </div>
        </div>
      )}
    </div>
  );
};

const Results = ({ countries }) => {
  const [show, setShow] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({});

  useEffect(() => {
    // Reset selected country if query is updated
    setShow(false);
    setSelectedCountry({});
  }, [countries]);

  if (countries.length === 0) {
    return <div>No results</div>;
  }

  const getInfo = (country) => {
    return (
      <div>
        <h2>{country.name}</h2>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <h3>languages</h3>
        {country.languages.map((e) => (
          <div key={e.name}>{e.name}</div>
        ))}
        <div>
          <img src={country.flag} width="100" height="100" alt="flag"></img>
        </div>
        <Weather country={country}></Weather>
      </div>
    );
  };

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (countries.length > 1) {
    return (
      <div>
        {countries.map((e) => (
          <div key={e.name}>
            {e.name}
            <button
              onClick={() => {
                setSelectedCountry(e);
                setShow(true);
              }}
            >
              show
            </button>
          </div>
        ))}
        {show && getInfo(selectedCountry)}
      </div>
    );
  } else {
    // single hit
    const c = countries[0];
    return getInfo(c);
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState("");

  const countriesToShow = countries.filter((p) =>
    p.name.toLocaleLowerCase().includes(countryFilter)
  );

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log(response.data);
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setCountryFilter(event.target.value);
  };

  return (
    <div>
      find countries
      <input value={countryFilter} onChange={handleFilterChange} />
      <Results countries={countriesToShow}></Results>
    </div>
  );
};

export default App;
