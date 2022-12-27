import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom'
import DetailedCityWeather from '../components/DetailedCityWeather';
import { DataContext } from '../contexts/DataProvider';


export default function CarSingle() {
    const { cityName } = useParams()
    const { temp, loadTemp, setTemp } = useContext(DataContext)

    useEffect(() => {
        async function handleLoadTemp(){
            const data = await loadTemp(cityName)
            setTemp(data)
            console.log(data)
        }
    
        handleLoadTemp()
        },[])

    const checkTemp = function () {
        console.log(temp)
    }

    return (
        <div className="car">
             <div className="flex-container">
           <DetailedCityWeather/>
                
            </div><button className="checkTemp" onClick={ checkTemp }>Check Temp!</button>
        </div>
    )
}