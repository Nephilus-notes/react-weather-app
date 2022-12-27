import { useContext } from 'react';
import { DataContext } from '../contexts/DataProvider';
import { AuthContext } from '../contexts/AuthProvider'
import BasicCityTemps from '../components/BasicCityTemps';
import SearchBy from '../components/SearchBy';
import ForecastTesterButton from '../components/ForecastTesterButton';

export default function Home(props) {
    const { forecast } = useContext(DataContext)
    const { user } = useContext(AuthContext)
    // console.log(temp)

    return (
        <div className="Home">
        <h1>Home</h1>
        <SearchBy/> 
           {
            (forecast && user.loggedIn) ?
        <>
        <BasicCityTemps forecast = { forecast } cityName='st louis'/>
         </>:
        <></>
        }
        {
            (!user.loggedIn)?
        <h2>Login  to begin your search</h2> :
        <></>
        }
        {/* <ForecastTesterButton/> */}
        </div>
    )}