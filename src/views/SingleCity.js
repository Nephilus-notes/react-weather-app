import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom'
import BasicCityTemps from '../components/BasicCityTemps'
import { DataContext } from '../contexts/DataProvider';


export default function CarSingle() {
    const { cityName } = useParams()
    const { temp } = useContext(DataContext)

    // useEffect(() => {
    //     async function handleLoadCar(){
    //         const data = await loadCar(uid, id)
    //         setCar(data)
    //         console.log(data)
    //     }
    
    //     handleLoadCar()
    //     },[id])

    return (
        <div className="car">
             <div className="flex-container">
                
           
            </div>
        </div>
    )
}