import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function CountryDetailsPage() {
  const { alpha3Code } = useParams();
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    async function fetchCountryData() {
      try {
        const response = await fetch(`https://ih-countries-api.herokuapp.com/countries/${alpha3Code}`);
        const data = await response.json();
        setCountryData(data);
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    }

    fetchCountryData();
  }, [alpha3Code]);

  return (
    <div className="container">
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Country Details</p>

      {countryData ? (
        <>
          <h1>{countryData.name.common}</h1>

          <table className="table">
            <thead></thead>
            <tbody>
              <tr>
                <td style={{ width: '30%' }}>Capital</td>
                <td>{countryData.capital}</td>
              </tr>
              <tr>
                <td>Area</td>
                <td>
                  {countryData.area} km<sup>2</sup>
                </td>
              </tr>
              <tr>
                <td>Borders</td>
                <td>
                  {countryData.borders.length > 0 ? (
                    <ul>
                      {countryData.borders.map((border) => (
                        <li key={border}>
                          <Link to={`/countries/${border}`}>{border}</Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    'No borders'
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CountryDetailsPage;
