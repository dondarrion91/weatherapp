import React,{Component} from "react";
import WeatherInfo from './components/weatherInfo.js';
import WeatherForm from './components/weatherForm.js';

import {WEATHER_KEY} from './keys';

class App extends Component{

    state = {
        temperature: '',
        description: '',
        humidity: '',
        windSpeed: '',
        city: '',
        country: '',
        error: null
    };


    getWeather = async (e) => {
        e.preventDefault();
        const {city,country} = e.target.elements;
        const cityValue = city.value;
        const countryValue = country.value;

        if(cityValue && countryValue){
            const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=${cityValue},${countryValue}&appid=${WEATHER_KEY}&units=metric`;
            fetch(API_URL); 
            console.log(cityValue,countryValue);
            const response = await fetch(API_URL);
            const data = await response.json();
            console.log(this.state)
    
            this.setState({
                temperature: data.main.temp, // "data" json de openweather , "main" propiedad con valores principales;
                description: data.weather[0].description,
                humidity:  data.main.humidity,
                windSpeed: data.wind.speed,
                city: data.name,
                country: data.sys.country,
                error: null
            },()=>{
                 console.log(this.state);
            })
        }else{
            this.setState({error: 'Please Entre a city and a country'});
        }
       
        
    }

    render(){
        return(
            <div className="container p-4">
                <div className="row">
                    <div className="col-md-4 mx-auto">
                        <WeatherForm getWeather={this.getWeather}/>
                        <WeatherInfo {...this.state}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;