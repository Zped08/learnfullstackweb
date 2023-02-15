import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY
const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState({});
  const [selectedCountry, setSelectedCountry] = useState({});

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await axios.get("https://restcountries.com/v2/all");
      setCountries(response.data);
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!searchTerm) return;
      try {
        const country = countries.find(
          (c) => c.name.toLowerCase() === searchTerm.toLowerCase()
        );
        if (!country) return;

        const response = await axios.get(
          `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${country.capital}`
        );
        setWeather(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWeather();
  }, [searchTerm, countries]);

  /*   useEffect(() => {
    const fetchWeather = async () => {
      if (!filteredCountries[0]) {
        return;
      }
      const response = await axios.get(
        'http://api.weatherstack.com/current?access_key=8e1f79abec92fb60a0aa30c142199f12&query=${filteredCountries[0].capital}'
      );
      setWeather(response.data);
    };
    fetchWeather();
  }, [filteredCountries]); */

  /*   const filteredCountries = countries && countries.filter((country)  => 
  country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  country.capital.toLowerCase().includes(searchTerm.toLowerCase()) 

  ); */
  const handleShowCountry = (country) => {
    setSelectedCountry(country);
  };

  const filteredCountries = countries.filter((country) => {
    const name = country.name ? country.name.toLowerCase() : "";
    const capital = country.capital ? country.capital.toLowerCase() : "";
    return (
      name.includes(searchTerm.toLowerCase()) ||
      capital.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search for a country"
      />
      <ul>
        {filteredCountries.map((country) => (
          <li key={country.alpha3Code}>
            <h3>{country.name}</h3>
            <button onClick={() => handleShowCountry(country)}>Show </button>
            {selectedCountry && (
              <div>
                <h2>{selectedCountry.name}</h2>
                <p>Capital: {selectedCountry.capital}</p>
                <p>Population: {selectedCountry.population}</p>
                <p>
              {" "}
              Languages:{" "}
              {country.languages.map((language) => language.name).join(", ")}
            </p>
            <img
              src={country.flag}
              alt={`Flag of ${country.name}`}
              height="200"
              width="200"
            />
              </div>
            )}

            {weather.current && (
              <div>
                <p>Temperature {weather.current.temperature}</p>
                <p>Description: {weather.current.weather_description[0]}</p>
                <img
                  src={weather.current.weather_icons[0]}
                  alt="Weather icon"
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default App;
