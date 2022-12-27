import { DataContext } from "../contexts/DataProvider"
import { useContext } from "react"

export default function ForecastTesterButton(props) {
    const { checkForecast } = useContext(DataContext)

    // console.log(props)
    return (
<button className="checkForecast" onClick={ checkForecast }>Check Forecast!</button>
        )}




