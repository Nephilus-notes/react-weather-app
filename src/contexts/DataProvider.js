import {useState, useEffect, createContext, useContext } from 'react'
import { getFirestore, getDocs, collection, doc, addDoc, query, setDoc } from '@firebase/firestore'
import { AuthContext } from './AuthProvider'

export const DataContext = createContext()

export const DataProvider = function (props) {
    const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY

    const db = getFirestore()
    const { user } = useContext(AuthContext)
    const [forecast, setForecast] = useState("")
    const [userCities, setUserCities] = useState([])
    const [ userCityUpdate, setUserCityUpdate ] = useState(false)
        
    const getWeatherDataZipOrCity = async function(radioBtnAnswer, searchParameters) {
        console.log("getting by something")
        if (radioBtnAnswer === 'cityName') {
            // console.log('By city')
            const weatherData = await getWeatherInfoByCityName(searchParameters) 
            return weatherData
        } else if (radioBtnAnswer === 'zipCode') {
            const weatherData = await getWeatherInfoByZipCode(searchParameters) 
            return weatherData
        } else {
            // errorFunct()
        }
    }

    const getWeatherInfoByCityName = async function(cityName) {
        try {
            // console.log(`api.openweathermap.org/data/2.5/forecast?q=${cityName}&JSON&appid=${ weatherApiKey }&units=imperial`)
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&JSON&appid=${ weatherApiKey }&units=imperial`)
            // console.log("got it back, changing to json")
            const weatherData = await response.json()
            // console.log(weatherData)
            setForecast(weatherData)
            // console.log(forecast)
            return weatherData
        }
        catch(err) {
            // errorFunct()
        }
    }
    
    const getWeatherInfoByZipCode = async function(zipCode) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${zipCode},US&JSON&appid=${ weatherApiKey }&units=imperial`)
            const weatherData = await response.json()
            setForecast(weatherData)
            return weatherData
        }
        catch(err) {
            // errorFunct()
        }
    }

    useEffect(() => {
        if (!user.loggedIn) {
            return
        } 
            async function getUserCities(){
                const userCitiesDocs = []
                // console.log(user.uid)
                const q = query(collection(db, 'user', user.uid, 'city'))
                // console.log(q)
                const querySnapshot = await getDocs(q)
                // console.log(querySnapshot)
                // console.log("Getting cities")
    
                querySnapshot.forEach(async (doc) => {
        
                    userCitiesDocs.push({
                        ...doc.data()
                    })
                    const copyTemps = [...userCitiesDocs]
                    // console.log(copyTemps)
                    setUserCities(copyTemps)
                })

            }
            getUserCities()
        },[user.loggedIn, userCityUpdate])


        async function addCity(cityName) {
            const userDoc = await setDoc(doc(db, 'user', user.uid), {
                username:user.username
            })
            if (cityName in userCities) {
                console.log("That city already exists.")

            } else { console.log("Adding City")
                const newFavoriteCity = await getWeatherInfoByCityName(cityName)
                newFavoriteCity.time_saved = Date.now()
                const newCityDoc = await setDoc(doc(db, 'user', user.uid, 'city', cityName), newFavoriteCity)
                if (userCityUpdate) {
                    setUserCityUpdate(false)
                } else {
                    setUserCityUpdate(true)
                }
            }
        }

        
    async function checkUserCities(name) {
        for (let city of userCities) {
            if (name == city.name) {
                if (Date.now() < city.time_saved + 300000) {
                    // console.log("returning city")
                    return city
                } else {
                    // console.log("refreshing city")
                    const cityForecastRefresh = await loadForecast(name);
                    cityForecastRefresh.time_saved = Date.now()
                    await setDoc(doc(db, 'user', user.uid, 'city', cityForecastRefresh.name.toLowerCase()),{
                        ...cityForecastRefresh,
                        // time_saved: Date.now()
                    })
                    if (userCityUpdate) {
                        setUserCityUpdate(false)
                    } else {
                        setUserCityUpdate(true)
                    }
                    return cityForecastRefresh
                }
            }
        } 
        
    }



    async function loadForecast(name){

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=790f14b98ea6a36905f407f0f4cd6157&units=imperial`)
            // console.log("got it back, changing to json")
            const weatherData = await response.json()
            setForecast(weatherData)
            // console.log(weatherData)

            
        return weatherData
    };

    const checkForecast = function () {
        console.log(forecast)
        console.log(userCities)
    }

    const value = {
        forecast,
        addCity,
        userCities,
        getWeatherDataZipOrCity, 
        loadForecast, 
        setForecast, 
        checkForecast,
        checkUserCities
    }

    return (
        <DataContext.Provider value={ value }>
            { props.children }
        </DataContext.Provider>
    )
}