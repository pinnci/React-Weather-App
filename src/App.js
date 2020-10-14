import React, { useEffect, useState } from 'react';

//components
import SearchForm from './Components/SearchForm/SearchForm';
import Heading from './Components/Heading/Heading';
import TodaysForecast from './Components/TodayForecast/TodaysForecast';
import WeekForecast from './Components/WeekForecast/WeekForecast';

//axios
import axios from 'axios';

//Lodash - debounce
import {debounce} from 'lodash';

//react-spring
import {useTransition, animated, useSpring} from 'react-spring';

//styles
import './App.scss';

function App() {
  const [forecast,setForecast] = useState({
    cityName:'',
    currentDegrees:'',
    currentIcon:'',
    description:'',
    highest:'',
    lowest:'',
    wind:'',
    humidity:'',
    sunrise:'',
    sunset:'',
    week:[],
    loading:false,
    error:false
  });

  //Transitions for forecast results 
  const [showForecast, setShowForecast] = useState(false);

  const forecastTransitions = useTransition(showForecast, null, {
    from: { opacity: 0,transform:'translateY(50px)' },
    enter: { opacity: 1,transform:'translateY(0px)' },
    leave: { opacity: 0 },
  });

  //Transitions for input
  const [moveInput, setMoveInput] = React.useState(true);

  const props = useSpring({
    transform: moveInput ? "translateY(38vh)" : "translateY(1vh)"
  });

  //Api key
  let apiKey = '078068390f0d05b827205ee746262c56';

  let lon;
  let lat;

  //Convert timestamp to time
  function convertSunset(sunset){
    var sunsetDate = new Date(sunset * 1000);
    var sunsetHours = sunsetDate.getHours();
    var sunsetMinutes = sunsetDate.getMinutes();

    return sunsetHours+':'+sunsetMinutes;
  }

  function convertSunrise(sunrise){
    var sunriseDate = new Date(sunrise * 1000);
    var sunriseHours = sunriseDate.getHours();
    var sunriseMinutes = sunriseDate.getMinutes();

    return sunriseHours+':'+sunriseMinutes;
  }

  //Debounce forecast animation ,so input animation will be fired earlier
  const debounceInputAnimation = debounce(() => {
    setShowForecast(true);
  },500);
  
  function searchCity(city){
    //Turn on loading before call to api. If call is succesful ,Loading will be turned off
    setForecast(prevState => ({
      ...prevState,
      loading:true,
      error:false
    }));

    //First axios call - Type in city name to get latitude and longtitude of that city
    axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      ).then(response => {
      lon = response.data.coord.lon;
      lat = response.data.coord.lat;

      setForecast(prevState => ({
        ...prevState,
        cityName:response.data.name+', '+response.data.sys.country,
        currentDegrees:Math.round(response.data.main.temp)+'°',
        description:response.data.weather[0].main,
        currentIcon:response.data.weather[0].icon,
        highest:Math.round(response.data.main.temp_max)+'°',
        lowest:Math.round(response.data.main.temp_min)+'°',
        wind:response.data.wind.speed +' km/h',
        sunrise:convertSunrise(response.data.sys.sunrise),
        sunset:convertSunset(response.data.sys.sunset),
        loading:false,
        error:false
      }));

    //Second axios call - Insert retrieved lon and lat values to get week forecast  
      axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&appid=${apiKey}`
      ).then(response => {
        //Push results to state
        setForecast(prevState => ({
          ...prevState,
          week:response.data.daily,
          humidity: response.data.current.humidity+'%'
        }))

        setMoveInput(false);
        debounceInputAnimation();
      })
    }).catch(()=>{
      setForecast(prevState => ({
        ...prevState,
        error:true,
        loading:false
      }))
    })
  }
  
  //Check error
    useEffect(() => {
      let input = document.getElementById('searchInput');

      if(forecast.error){
        input.style.border='2px solid red';
        input.value='';
        input.placeholder='Enter correct name of the city!';
        input.classList.add('redPlaceholder');
      }else{
        input.style.border='none';
        input.classList.remove('redPlaceholder');
        input.placeholder='Type your city here...';
      }
    },[forecast.error]);
  
  return (
    <div className="container">

      <animated.div style={props} className="search">

        <SearchForm 
          searchCity={searchCity}
          loading={forecast.loading}
        />

      </animated.div>

      {forecastTransitions.map(({ item, key, props }) =>
        item && <animated.div key={key} style={props}>

        <Heading 
          city={forecast.cityName}
        />

        <TodaysForecast 
          currentDegrees={forecast.currentDegrees}
          currentIcon={forecast.currentIcon}
          description={forecast.description}
          highest={forecast.highest}
          lowest={forecast.lowest}
          wind={forecast.wind}
          humidity={forecast.humidity}
          sunrise={forecast.sunrise}
          sunset={forecast.sunset}
        />

        <WeekForecast
          weekForecast={forecast.week}
        />
        </animated.div>
      )}

      </div>
  );
}

export default App;
