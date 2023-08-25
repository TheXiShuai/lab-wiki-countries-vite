import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [countries, setCountries] = useState([]);
  const apiUrl = "https://ih-countries-api.herokuapp.com/countries";

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container" style={{ maxHeight: "90vh", overflow: "scroll" }}>
      <h1 style={{ fontSize: "24px" }}>WikiCountries: Your Guide to the World</h1>
      <div className="list-group">
        {countries.map((country) => (
          <Link key={country.alpha3Code} to={`/${country.alpha3Code}`}>
            <div className="country-item">
              <img
                src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
                alt={`${country.name.common} Flag`}
              />
              <p>{country.name.common}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
