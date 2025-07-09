import React, { useState, useEffect } from 'react';
import { WeatherSvg } from "weather-icons-animated";
import './WeatherApp.css';


const WeatherApp = () => {
    const api_key = 'd5f3580dfd8bca5d0f2a605b803c595a';
    const [data, setData] = useState({});


    const setWeather = async (position) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=44.46&lon=11.433&units=Metric&appid=${api_key}`; // default position --> Bologna

        /* getPosition 
        if (position && position.coords) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            console.log('Latitude:', lat); // Log per verificare la latitudine
            console.log('Longitude:', lon); // Log per verificare la longitudine
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`; // Da capire come prendere
        }
            */

        // get response
        const res = await fetch(url);
        const WeatherData = await res.json();
        console.log(WeatherData);

        //setData
        setData(WeatherData);

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

    const setError = (error) => {
        console.log(error);
    };


    /*
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(setWeather, setError);
    }, []);
    */

    useEffect(() => {
        setWeather();
    }, []);
    

    return (
        <div className='weather-app d-flex flex-column m-lg-0 m-md-0 mt-4 ms-4'>

            <header className='weather-header d-flex justify-content-between'>
                <div className='welcome d-flex align-self-start flex-column'>
                    <h3 className='m-0' id='hi'> Welcome </h3>
                    <h4 className='m-0'id='hi-user'> user !</h4>
                </div>
                <div className='current-day rounded d-flex p-1'>
                    <div className='day-date'>
                        <p className='m-0'> Tues</p>
                        <p className='m-0'> Aug 20 </p>
                    </div>
                    <div className='day-number'>
                        <h6 className='ms-1'> 18 </h6>
                    </div>
                </div>
            </header>
            <div className='weather m-0 d-flex justify-content-around align-items-center'> 
            <div className='weather-data m-0'>
                <div className='weather-info d-flex mt-1'>
                    <p className='degree m-0'> {data.main ? `${Math.floor(data.main.temp)}` : null}°</p>
                    <p className='weather-description d-flex align-self-end m-0 '> {data.weather ? data.weather[0].main : null} </p>
                </div>
                <div className='location d-flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" fillRule="white" className="bi bi-geo-alt" viewBox="0 0 16 16">
                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                    </svg>
                    <h6 id='city' className='ms-1'> {data.name ? data.name : null} </h6>
                </div>
            </div>
            <div className='weather-icon'>
                <WeatherSvg state={weatherImage} width='18vh' height='18vh' />
            </div>

            </div>

        </div>

    );
}

export default WeatherApp;


/*
<div className='location'> 
            <h6 id='city'> {data.name ? data.name : null} </h6>
            </div>
            <Clock/>
            <div className='weather-icon mt-2 mb-3'>
                <WeatherSvg state={weatherImage} width={180} height={180} />
            </div>
            <div className='weather-info d-flex'>
                    <h2 className='degree align-self-end'> {data.main ? `${Math.floor(data.main.temp)}` : null}</h2>
                    <h6 className='celsius align-self-start  mt-2'> C° </h6>
                    <p className='weather-description align-self-end'> {data.weather ? data.weather[0].main : null} </p>
                </div>
                <div className='weather-specifics ms-4 mt-3 d-flex flex-column'>
                    <div className='humidity d-flex align-items-center'>
                    <img className = "WeatherIcon p-2" src={ humidity }></img>
                    <p> Humidity: {data.main ? data.main.humidity : null}% </p>
                    </div>
                    <div className='windSpeed d-flex align-items-center'> 
                    <img className = "WeatherIcon p-2" src={ wind }></img>
                    <p> Wind speed: {data.wind ? `${Math.floor(data.wind.speed)}` : null} km/h </p>


                    </div>
            </div>    
           
*/




/* 
  <div className='weather-main d-flex'>
                <div className='weather-data '>

                    <div className='weather-info d-flex'> 
                    <h2 className='degree '> {data.main ? `${Math.floor(data.main.temp)}` : null}°</h2>
                    <p className='weather-description '> {data.weather ? data.weather[0].main : null} </p>
                    </div>
               
                <div className='location d-flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" class="bi bi-geo-alt" viewBox="0 0 16 16">
                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                    </svg>
                    <h6 id='city' className='ms-1'> {data.name ? data.name : null} </h6>
                </div>
                </div>
                <div className='weather-icon'>
                <WeatherSvg state={weatherImage} width={170} height={170} />
            </div>
            </div>

*/