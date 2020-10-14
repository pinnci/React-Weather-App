import React from 'react';

//Styles
import './WeekForecast.scss';

//Icons
import Cloud from '../Icons/Cloud';
import Rain from '../Icons/Rain';
import Fog from '../Icons/Fog';
import Snow from '../Icons/Snow';
import Thunderstorm from '../Icons/Thunderstorm';
import Clear from '../Icons/Clear';

function WeekForecast(props){
    let weekForecast = props.weekForecast.map((day,i) => (
        <div key={i} className="card">
            <h4>{convertToDate(day.dt)}</h4>
            {switchIcons(day.weather[0].main)}
            <p>{Math.round(day.temp.day)}° / {Math.round(day.temp.night)}°</p>
        </div>
    ));

    //Convert timestamp to date
    function convertToDate(timestamp){
        var date = new Date(timestamp * 1000);
        var day = date.getDate() +1;
        var month = date.getMonth() +1;
        return day+'.'+month;
    }

    //Switch icons
    function switchIcons(day){
        if(day === 'Thunderstorm'){
            return <Thunderstorm />
        }

        if(day === 'Drizzle'){
            return <Rain />
        }

        if(day === 'Rain'){
            return <Rain />
        }

        if(day === 'Snow'){
            return <Snow />
        }

        if(day === 'Mist'){
            return <Fog />
        }

        if(day === 'Clear'){
            return <Clear />
        }

        if(day === 'Clouds'){
            return <Cloud />
        }
    }

    return(
        <div className="wrapper">
            <h3>Forecast</h3>
            <div className="cards">
                {weekForecast}
            </div>
        </div>

    )
}

export default WeekForecast;