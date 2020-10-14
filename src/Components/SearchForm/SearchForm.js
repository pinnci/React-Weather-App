import React, { useEffect, useRef } from 'react';

//Lodash - Debounce
import {debounce} from 'lodash';

//Styles
import './SearchForm.scss';

function SearchForm(props){
    //Handle form submit
    function handleSubmit(e){
        e.preventDefault();
        searchForCity();
    }

    //Create useRef hook for input
    const searchedCity = useRef(null);

    //Get value of input and send it to function in App.js. That function will fire axios call.
    function searchForCity(){
        let city;

        //If is anything in useRef
        if(searchedCity.current !== null){
            city = searchedCity.current.value;
        }

        //Send it to function
        if(city){
            props.searchCity(city);
        }
    }

    //Fire searchForCity function 0.5s after you stopped typing.
    const handleInput = debounce(() => {
        searchForCity();
    },500);

    //check if loading is true
    useEffect(() => {
        let span = document.getElementById('inputLoading');
        if(props.loading){
            span.classList.add('loader')
        }else{
            span.classList.remove('loader')
        }

      },[props.loading]);

    return(
        <form onSubmit={handleSubmit}>
            <h1>WEATHER APP</h1>
            <div className="loaderWrapper">
                <input 
                    type="text" 
                    placeholder="Type your city here..." 
                    onChange={handleInput}
                    ref={searchedCity} 
                    autoFocus 
                    spellCheck="false"
                    autoComplete="off"
                    id="searchInput" />
                
                <span id="inputLoading" className="loader"></span>
            </div>
        </form>
    )
}

export default SearchForm;