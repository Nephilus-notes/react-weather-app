import { useContext } from 'react';
import { DataContext } from '../contexts/DataProvider';
import BasicCityTemps from '../components/BasicCityTemps';
import SearchBy from '../components/SearchBy';

export default function Home(props) {
    const { temp } = useContext(DataContext)

    // console.log(temp)

    return (
        <div className="Home">
        <h1>Home</h1>
        <SearchBy/> 
           {
            (temp) ?
        <BasicCityTemps temp = {temp} cityName='st louis'/>  :
        <></>
        }
        </div>
    )}