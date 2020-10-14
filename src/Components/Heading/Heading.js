import React from 'react';

//Styles
import './Heading.scss';

function Heading(props){
    //Days and months
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    //Get current date and list current day and date
    let date = new Date();
    let currentDay = days[date.getDay()]+' '+date.getDate()+' '+months[date.getMonth()];

    return(
        <div className="heading">
            <h1>{props.city}</h1>
            <h2>{currentDay}</h2>
        </div>
    )
}

export default Heading;