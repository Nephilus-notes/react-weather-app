import { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../contexts/DataProvider";

export default function BasicCityTemps(props) {
  const { temp } = useContext(DataContext);



  if (temp)
   {
    return (
      <div className="BasicCityTemps container">
        {/* { buildTitleLink() } */}
        <div className="card-header text-light border-dark">
          <h2>{temp?.name}</h2>
        </div>
        <div className="card-body">
          <div className="currentTempDiv">
            <p className="currentTemp">{temp?.main.temp.toFixed(1)}&deg;</p>
            <p className="feelsLike">
              Feels like: <strong>{temp.main?.feels_like}&deg;</strong>
            </p>
          </div>

    <ul>
            <li className="clickable infoFields" id="high">
              Today's High: {temp?.main.temp_max.toFixed(1)}&deg;
            </li>
            <li className="clickable infoFields" id="low">
              Today's Low: {temp?.main.temp_min.toFixed(1)}&deg;
            </li>
            <li className="clickable infoFields" id="forecast">
              Today's Forecast: {temp?.weather[0].main}
            </li>
            <li className="clickable infoFields" id="humidity">
              Current Humidity: {temp?.main.humidity}%
            </li>
          </ul>
          <Link to={ `/temps/${temp.name }`}> <p className='button'> More Info</p></Link>

        </div>
      </div>
    );
  } else {
    return ("Loading Temps")
  }
}
