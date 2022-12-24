import {useState, useEffect, createContext, useContext } from 'react'
import { getFirestore, getDocs, collection, collectionGroup, doc, getDoc, Timestamp, addDoc, orderBy, query, setDoc } from '@firebase/firestore'
import { AuthContext } from './AuthProvider'

export const DataContext = createContext()

export const DataProvider = function (props) {
    const db = getFirestore()
    const { user } = useContext(AuthContext)
    const [temp, setTemp] = useState('')
    const [userTemps, setUserTemps] = useState([])
    const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY

    useEffect(() => {
        async function getTemp(){
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=st louis&appid=790f14b98ea6a36905f407f0f4cd6157&units=imperial`)
            // console.log("got it back, changing to json")
            const weatherData = await response.json()
            setTemp(weatherData)
            
        }
        getTemp()
    }, [])
        
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
            console.log(`api.openweathermap.org/data/2.5/forecast?q=${cityName}&JSON&appid=${ weatherApiKey }&units=imperial`)
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&JSON&appid=${ weatherApiKey }&units=imperial`)
            console.log("got it back, changing to json")
            const weatherData = await response.json()
            console.log(weatherData)
            setTemp(weatherData)
            console.log(temp)
        }
        catch(err) {
            // errorFunct()
        }
    }
    
    const getWeatherInfoByZipCode = async function(zipCode) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${zipCode},US&JSON&appid=${ weatherApiKey }&units=imperial`)
            const weatherData = await response.json()
            setTemp(weatherData)
        }
        catch(err) {
            // errorFunct()
        }
    }

    useEffect(() => {
        if (!user.loggedIn) {
            return
        } 
            async function getUserTemps(){
                const userTempsDocs = []
                // console.log(user.uid)
                const q = query(collection(db, 'user', user.uid, 'city'))
                // console.log(q)
                const querySnapshot = await getDocs(q)
                // console.log(querySnapshot)
    
                querySnapshot.forEach(async (doc) => {
        
                    userTempsDocs.push({
                        id:doc.id,
                        cityName:doc.name,
                        ...doc.data()
                    })
                    const copyTemps = [...userTempsDocs]
                    // console.log(copyTemps)
                    setUserTemps(copyTemps)
                })
    
            }
            getUserTemps()
        },[user.loggedIn])

    // useEffect(() => {
    //     async function handleGetTemp(){
    //         const data = await getTemp()
    //         setCar(data)
    //         console.log(data)
    //     }
    
    //     handleLoadCar()
    //     },[id])

        
    async function addCity(cityName) {
        const newCity = {  //carObj
            cityName:cityName,
            
        }
        
        const userDoc = await setDoc(doc(db, 'user', user.uid), {
            username:user.username
        })

        const cityDoc = await addDoc(collection(db, 'user', user.uid , 'city'), newCity)
        // console.log(` this is a new car ${newCar} `)
        // console.log(newCar)
        // const doc = await addDoc(collection(db, 'cars'), newCar)

        newCity.id = cityDoc.id
        console.log(newCity)
        // setCars([newCar, ...cars])
        // setUserCars([newCar, ...userCars])
    
    }

    async function loadTemp(newTemp){
        for (let userTemp in userTemps) {
            if (newTemp === userTemp) {
                return userTemp
            } else {
                const userTempsDocs = userTemps
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${newTemp.cityName}&appid=790f14b98ea6a36905f407f0f4cd6157&units=imperial`)
            // console.log("got it back, changing to json")
            const weatherData = await response.json()
            setTemp(weatherData)
            userTempsDocs.push({
                id: weatherData.id,

                ...weatherData.data()
            })
            const copyTemps = [...userTempsDocs]
            // console.log(copyTemps)
            setUserTemps(copyTemps)

            }
        }    
    };


    const value = {
        temp,
        addCity,
        userTemps,
        getWeatherDataZipOrCity, 
        loadTemp, 
        setTemp
    }

    return (
        <DataContext.Provider value={ value }>
            { props.children }
        </DataContext.Provider>
    )
}