import userEvent from '@testing-library/user-event';
import { useState, useContext } from 'react';
import { DataContext } from '../contexts/DataProvider';
import { AuthContext } from '../contexts/AuthProvider';
 
export default function SearchBy(props) {
    const [placeholderCity, setPlaceholderCity] = useState('Input City Name')
    const { getWeatherDataZipOrCity } = useContext(DataContext)
    const { user } = useContext(AuthContext)

    // console.log(props)
    function handleSearchBy(event) {
        event.preventDefault()
        if (user.loggedIn) {
        const formData = new FormData(event.target)
        const radioAnswers = formData.get('searchBy')
        console.log(radioAnswers)
        const cityName = formData.get('searchParameters')
        
       
        // let cityName = document.getElementsByName('searchParameters')[0]
        console.log(cityName)
        getWeatherDataZipOrCity(radioAnswers, cityName) 
        // event.target.placeholder = cityName
        event.target.reset()
        // event.target.querySelector('[name="searchParameters"]').placeholder = cityName

        setPlaceholderCity(cityName)
        } else {
            // Not doing anything right now, but I would love to show an error message.
            return (
                <p>Please Login</p>
            )
        }
    }

    return (
        <>
<form action="" onSubmit={ handleSearchBy } className="locationInfo">
        <div className="radioFlex d-flex">
            <div className="radiosLabels d-flex flex-column">
                <label htmlFor="locationInfo" className="text-light text-right">By City:</label>
                <label htmlFor="locationInfo" className="text-light">By Zip Code:</label>
            </div>
            <div className="radioButtons d-flex flex-column">
                <div className="radio">
                <input type="radio" id="cityName" name="searchBy" value="cityName" defaultChecked/>
                </div><div className="radio">
                <input type="radio" id="zipCode" name="searchBy" value="zipCode"/>
            </div></div>

             <input type="text" name="searchParameters" placeholder={ placeholderCity }/>
        <button type="submit" className="btn btn-primary" id="showWeatherBtn">Show my weather</button>
        </div>
 </form> 
</>
       
      )}