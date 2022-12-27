import { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../contexts/DataProvider";

export default function BasicCityTemps(props) {
  const { forecast } = useContext(DataContext);



  if (forecast)
   {
    return (
      <div className="BasicCityTemps container">
        {/* { buildTitleLink() } */}
        <div className="card-header text-light border-dark">
          <h2>{forecast?.name}</h2> <div></div>
        </div>
        <div className="card-body">
          <div className="currentTempDiv">
            <p className="currentTemp">{forecast?.main.temp.toFixed(1)}&deg;</p>
            <p className="feelsLike">
              Feels like: <strong>{forecast.main?.feels_like}&deg;</strong>
            </p>
          </div>

    <ul>
    {/* <FontAwesomeIcon icon="fa-solid fa-circle-heart" /> */}
            <li className="clickable infoFields" id="high">
              Today's High: {forecast?.main.temp_max.toFixed(1)}&deg;
            </li>
            <li className="clickable infoFields" id="low">
              Today's Low: {forecast?.main.temp_min.toFixed(1)}&deg;
            </li>
            <li className="clickable infoFields" id="forecast">
              Today's Forecast: {forecast?.weather[0].main}
            </li>
            <li className="clickable infoFields" id="humidity">
              Current Humidity: {forecast?.main.humidity}%
            </li>
          </ul>
          <Link to={ `/temps/${forecast.name }`}> <p className='button'> More Info</p></Link>

        </div>
      </div>
    );
  } else {
    return ("Loading Temps")
  }
}
