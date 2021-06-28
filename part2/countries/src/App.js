import React, { useState, useEffect } from "react";

import axios from "axios";

const Results = ({ countries }) => {
  if (countries.length === 0) {
    return <div>No results</div>;
  }

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (countries.length > 1) {
    return countries.map((e) => <div key={e.name}>{e.name}</div>);
  } else {
    // single hit
    const c = countries[0];
    return (
      <div>
        <h2>{c.name}</h2>
        <div>capital {c.capital}</div>
        <div>population {c.population}</div>
        <h3>languages</h3>
        {c.languages.map((e) => (
          <div key={e.name}>{e.name}</div>
        ))}
        <div>
          <img src={c.flag} width="100" height="100" alt="flag"></img>
        </div>
      </div>
    );
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
