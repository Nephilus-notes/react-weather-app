import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { DataContext } from "../contexts/DataProvider";
import Button from "../components/Button";
import BasicCityTemps from "../components/BasicCityTemps";

export default function Profile(props) {
  const { addCity, forecast, userCities, loadForecast, setForecast, checkUserCities } =
    useContext(DataContext);
  const { user } = useContext(AuthContext);

  function handleSubmit(event) {
    console.log("form Submission");
    event.preventDefault();
    const formData = new FormData(event.target);
    if (formData.get("cityName")) {
      addCity(formData.get("cityName").toLowerCase());
      event.target.reset();
    } else {
      console.log("that city already exists.")
    }
  }


  if (user.loggedIn) {
    // console.log(userCities)
    return (
      <div className="Profile">
        <h1>Profile</h1>
<div>
        <h2>Favorite a city</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex-container">
            <input type="text" name="cityName" placeholder="City Name" />
          </div>
          <button className="button">Submit Favorite!</button>
        </form>
   </div>   

           <p>Favorite Cities:</p> 
          <div className="flex-container">
            {userCities?.map((city) => ( 
            <Button city={city} handleClick={async () => {
                //  console.log(city);
                  const newCity = await checkUserCities(city.name);
                  // console.log(newCity);
                 setForecast(newCity);
                }}
                key={city.id}
             />
            ))}
          </div>

            {forecast ? <BasicCityTemps forecast={forecast} showLink="true" /> : <></>} 

      </div>
    );
  } else {
    return (
      <div className="Profile">
        <h1>Profile</h1>

        <h2>Weather</h2>
        <p>
          <strong>
            Please log in to view the weather in your area and beyond
          </strong>
        </p>
      </div>
    );
  }
}
