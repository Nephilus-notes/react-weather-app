import { useContext } from 'react';
import { DataContext } from '../contexts/DataProvider';
import { AuthContext } from '../contexts/AuthProvider'
import BasicCityTemps from '../components/BasicCityTemps';
import SearchBy from '../components/SearchBy';

export default function Home(props) {
    const { temp } = useContext(DataContext)
    const { user } = useContext(AuthContext)
    // console.log(temp)

    return (
        <div className="Home">
        <h1>Home</h1>
        <SearchBy/> 
           {
            (temp && user.loggedIn) ?
        <BasicCityTemps temp = {temp} cityName='st louis'/>  :
        <></>
        }
        {
            (!user.loggedIn)?
        <h2>Login  to begin your search</h2> :
        <></>
        }
        </div>
    )}