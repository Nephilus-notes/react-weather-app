import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom'
import { DataContext } from '../contexts/DataProvider';
import DetailedCityWeather from '../components/DetailedCityWeather';
import ForecastTesterButton from '../components/ForecastTesterButton';


export default function CarSingle() {
    const { cityName } = useParams()
    const { forecast, loadForecast, setForecast } = useContext(DataContext)

    useEffect(() => {
        async function handleLoadForecast(){
            const data = await loadForecast(cityName)
            setForecast(data)
            // console.log(data)
        }
    
        handleLoadForecast()
        },[])



    return (
        <div className="car">
             <div className="flex-container">
           <DetailedCityWeather/>
                
            </div>
            {/* <ForecastTesterButton/> */}
        </div>
    )
}