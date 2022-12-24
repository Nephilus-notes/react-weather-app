import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { DataContext } from "../contexts/DataProvider";
import Button from "../components/Button";
import BasicCityTemps from "../components/BasicCityTemps";


export default function Profile(props) {
  const { addCity, temp, userTemps } = useContext(DataContext);
  const { user } = useContext(AuthContext)
//   const [car, setCar] = useState("");


      function handleSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        if (formData.get('cityName')) {
            console.log("form Submission")
            addCity(formData.get('cityName'))
            event.target.reset()
            }
        }
       if (user.loggedIn) {
  return (
    <div className="Profile">
      <h1>Profile</h1>

      <h2>Favorite a city</h2>
      <form onSubmit={handleSubmit}>
      <div className="flex-container">
        <input type="text" name="cityName" placeholder="City Name" />

        </div>
        <button className='button'>Show Me The Weather!</button>
      </form>

      <ul>
      <div className="flex-container">
          {userTemps?.map(temp => <Button temp={ temp } handleClick={ async ()=> { 
          console.log( temp.uid)
          console.log( user.uid )          
        //   const newCar = await loadCar(user.uid, temp.id)
          console.log(user.uid, temp.id)
        //   setCar(newCar)
         }
         } key={ temp.id } />)}
         </div>
               <div className="flex-container">

          {/* {
            (temp) ?
            <BasicCityTemps temp={ temp } showLink = 'true'/> :
            <></>

          } */}
          </div>
        </ul>
    </div>
  )} else {
  return ( 
    <div className="Profile">
      <h1>Profile</h1>

      <h2>Create a New Listing</h2>
    <p><strong>Please log in to view your car dashboard</strong></p>
    </div>
  )}
  
  ; 
} 
