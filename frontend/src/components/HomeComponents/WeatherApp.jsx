import { useState, useEffect } from 'react';
import { WeatherSvg } from "weather-icons-animated";
import { useSelector } from 'react-redux';
import { DateTime } from "luxon";
import "../NotesComponents/NotesList.css";
import './WeatherApp.css';


const WeatherApp = () => {
    const api_key = 'd5f3580dfd8bca5d0f2a605b803c595a';
    const [data, setData] = useState({});
    const { userInfo } = useSelector((state) => state.auth);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const TM_date = useSelector((state) => state.time.value);
    const d = DateTime.fromISO(TM_date);


    const setWeather = async () => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=44.46&lon=11.433&units=Metric&appid=${api_key}`;
            const res = await fetch(url);
            const WeatherData = await res.json();
            setData(WeatherData);
        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };


    const weatherImages = {
        Clear: "sunny",
        Clouds: "cloudy",
        Rain: "rainy",
        Snow: "snowy",
        Haze: "cloudy",
        Mist: "fog",
        Thunderstorm: "lightning"
    }

    const weatherImage = data.weather ? weatherImages[data.weather[0].main] : null;


    useEffect(() => {
        setWeather();
    }, []);




    return (
        <div className='weather-app d-flex flex-column m-lg-0 m-md-0 mt-4 ms-4'>

            <header className='weather-header d-flex justify-content-between'>
                <div className='welcome d-flex align-self-start flex-column'>
                    <h3 className='m-0' id='hi'> Welcome </h3>
                    <h4 className='m-0' id='hi-user'>  {userInfo.name} ! </h4>
                </div>
                <div className='current-day rounded me-2'>
                    <h6 className='m-0 mb-1'> {d.toFormat("dd")} </h6>
                    <div className='wrap d-flex flex-column ms-2'>
                        <p> {d.toFormat("MM")} </p>
                        <p> {d.toFormat("yy")} </p>
                    </div>
                </div>

            </header>
            <div className='weather m-0 d-flex justify-content-around align-items-center'>
                <div className='weather-data m-0'>
                    <div className='weather-info d-flex mt-1'>
                        <p className='degree m-0'> {data.main ? `${Math.floor(data.main.temp)}` : null}°</p>
                        <p className='weather-description d-flex align-self-end m-0 '> {data.weather ? data.weather[0].main : null} </p>
                    </div>
                    <div className='location'>
                        <i class='bx-sm  bx-location'></i>
                        <h6 id='city' className='ms-1'> {data.name ? data.name : null} </h6>
                    </div>
                </div>
                <div className='weather-icon'>
                    <WeatherSvg state={weatherImage} />
                </div>

            </div>

        </div>

    );
}

export default WeatherApp;

