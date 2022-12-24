import { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../contexts/DataProvider";
import BasicCityTemps from "./BasicCityTemps";

export default function DetailedCityWeather(props) {
  const { temp } = useContext(DataContext);

    const windDirection = function(windDegrees) {
        if (windDegrees < 22  || windDegrees <=337 ) {
            return "North"
        } else if (windDegrees >= 22  || windDegrees < 67 ) {
            return "Northeast"
        } else if (windDegrees >= 67  || windDegrees < 112 ) {
            return "East"
        } else if (windDegrees >= 112  || windDegrees < 157 ) {
            return "Southeast"
        } else if (windDegrees >= 157  || windDegrees < 202 ) {
            return "South"
        } else if (windDegrees >= 202  || windDegrees < 249 ) {
            return "Southwest"
        } else if (windDegrees >= 249  || windDegrees < 294 ) {
            return "West"
        } else if (windDegrees >= 294  || windDegrees < 337 ) {
            return "Northwest"
        } 
    }

  if (temp)
  {
    let windPointer =  windDirection(temp.wind.deg)
   return (
     <div className="DetailedCityWeather container">
       {/* { buildTitleLink() } */}
       <div className="card-header text-light border-dark">
         <h2>{temp?.name}</h2>
       </div>
       <div className="flex-container alignBottom">
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
             Current Forecast: {temp?.weather[0].main}
           </li>
           <li className="clickable infoFields" id="humidity">
             Current Humidity: {temp?.main.humidity}%
           </li>
         </ul>
    <div className="moreInfo">
        <ul>
            <li className='infoFields'>{ temp.weather[0].description } </li>
            <li className='infoFields'>Clouds: {temp.clouds.all}</li>
            <li className='infoFields'>Wind: { windPointer } {temp.wind.speed } <small>mph </small> </li>
            <li className='infoFields'>Visibility: {(temp.visibility/1000 * 0.621371).toFixed(1)} miles </li>
            <li className='infoFields'>Barometric Pressure: { (temp.main.pressure * (.02953)).toFixed(1)}</li>
        </ul>
    </div>
       </div>
     </div>
   );
 } else {
   return ("Loading Temps")
 }
}
