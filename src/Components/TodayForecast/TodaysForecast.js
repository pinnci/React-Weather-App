import React from 'react';

//Styles
import './TodaysForecast.scss';

//Icons
import Cloud from '../Icons/Cloud';
import Rain from '../Icons/Rain';
import Fog from '../Icons/Fog';
import Snow from '../Icons/Snow';
import Thunderstorm from '../Icons/Thunderstorm';
import Clear from '../Icons/Clear';
import Moon from '../Icons/Moon';

function TodaysForecast(props){
    //Switch between icons
    function switchIcons(){
        if(props.description === 'Thunderstorm'){
            return <Thunderstorm />
        }

        if(props.description === 'Drizzle'){
            return <Rain />
        }

        if(props.description === 'Rain'){
            return <Rain />
        }

        if(props.description === 'Snow'){
            return <Snow />
        }

        if(props.description === 'Mist'){
            return <Fog />
        }

        if(props.description === 'Clear' && props.currentIcon === '01d'){
            return <Clear />
        }

        if(props.description === 'Clear' && props.currentIcon === '01n'){
            return <Moon />
        }

        if(props.description === 'Clouds'){
            return <Cloud />
        }
    }
    return(
        <div className="today">

            <div className="main">
                {switchIcons()}

                <div className="column">
                    <h1>{props.currentDegrees}</h1>
                    <p>{props.description}</p>
                </div>
            </div>

            <div className="additional">
                <div className="row">
                    <div className="column">
                        <p>{props.highest}</p>
                        <small>High</small>
                    </div>

                    <div className="column">
                        <p>{props.wind}</p>
                        <small>Wind</small>
                    </div>

                    <div className="column">
                        <p>{props.sunrise}</p>
                        <small>Sunrise</small>
                    </div>
                </div>

                <div className="row">
                    <div className="column">
                        <p>{props.lowest}</p>
                        <small>Low</small>
                    </div>

                    <div className="column">
                        <p>{props.humidity}</p>
                        <small>Humidity</small>
                    </div>

                    <div className="column">
                        <p>{props.sunset}</p>
                        <small>Sunset</small>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default TodaysForecast;