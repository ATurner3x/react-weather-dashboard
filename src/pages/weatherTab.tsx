import React, { useState, useEffect } from 'react';
import {
  
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonList,
  IonItem,
  IonIcon,
  IonSearchbar,
  IonButton, 
  IonInput,
  IonSegment,
  IonSegmentButton,
} from '@ionic/react';

import { CustomEventDetail } from '@ionic/core';
import { sunny , rainy , speedometer , cloud } from 'ionicons/icons'; // Import icon here
import './weatherTab.css'; //import css here
import axios from 'axios';

const WeatherTab: React.FC = () => {

  const [city, setCity] = useState(''); // Set Default city here
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [searchText, setSearchText] = useState('');
  const [temperatureUnit, setTemperatureUnit] = useState('Fahrenheit'); //
  const [humidity, setHumidity] = useState<number | null>(null);
  const [windSpeed, setWindSpeed] = useState<number | null>(null);
  const [weatherCondition, setWeatherCondition] = useState<string | null>('');



  // An array to store autocomplete suggestions
  const [suggestions, setSuggestions] = useState<string[]>([]);


  // Weather Fetching Logic
  useEffect(() => {
   
    // API key for OpenWeatherMap goes here
    const apiKey = '8c1bc17647319a23fbee25bc0228efe2';
                                                                                        // const city = 'detroit'; // Replace with your desired city

    // Make an API request to OpenWeatherMap
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}`;


    axios
      .get(apiUrl)
      .then((response) => {
        setWeatherData(response.data);
        // Extract additional weather information from API
      setHumidity(response.data.main.humidity);
      setWindSpeed(response.data.wind.speed);
      setWeatherCondition(response.data.weather[0].description);
      })
      .catch((error) => {
        console.error('Error fetching weather data', error);
      });
    }, [city]);

   // Function to convert Kelvin to Fahrenheit
   const kelvinToFahrenheit = (kelvin: number) => {
    return (kelvin - 273.15) * 9/5 + 32; // Conversion formula
  };

  // Function to convert Celsius to Fahrenheit
const celsiusToFahrenheit = (celsius: number) => {
  return (celsius * 9/5) + 32; // Conversion formula
};

// Function to convert Fahrenheit to Celsius
const fahrenheitToCelsius = (fahrenheit: number) => {
  return (fahrenheit - 32) * 5/9; // Conversion formula
};


   // Function to handle the search button click
   const handleSearch = () => {
    // Update the weather data for the selected city
    // The useEffect hook will fetch the new data
    setSearchText(''); // Clear the input field
  };

  // Function to handle the search bar input and update autocomplete suggestions
  const handleSearchBarInput = (e: CustomEvent) => {
    const inputText = e.detail.value;

    // Update the search text state
    setSearchText(inputText);

    //Placeholder for autocomplete suggestions , Implement cities API here
    const basicCities = ['Detroit', 'New York', 'Los Angeles', 'Chicago', 'Miami', 'San Francisco', 'Seattle'];
    const filteredSuggestions = basicCities.filter((city) =>
      city.toLowerCase().includes(inputText.toLowerCase())
    );

    // Update the suggestions state with the filtered suggestions
    setSuggestions(filteredSuggestions);
  };

  return (

    <IonPage>
      <IonHeader className="weather-header">
        <IonToolbar>
        <IonTitle>Weather Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

    {/* Location Selection */}
        <IonList className="location-selection">
        <IonSearchbar
        value={searchText}
        onIonChange={(e) => handleSearchBarInput(e)}
        placeholder="Enter city name"
        debounce={500} // Adjust the delay as needed (in milliseconds)
        
/>
          <IonItem>
            <IonButton expand="full" onClick={handleSearch}>
              Search
            </IonButton>
             <IonButton
      expand="full"
      fill="clear"
      onClick={() => {
        // Clear the input field and reset to the default city
        setSearchText('');
        setCity('Detroit'); // Replace Detroit with geo location info
      }}
    >
      Clear Input
    </IonButton>
          </IonItem>
        </IonList>

        {/* Display the Selected Unit and Allow User Switching */}
  <IonSegment
    value={temperatureUnit}
    onIonChange={(e) => setTemperatureUnit(e.detail.value)}
  >
    <IonSegmentButton value="Fahrenheit">
      Fahrenheit
    </IonSegmentButton>
    <IonSegmentButton value="Celsius">
      Celsius
    </IonSegmentButton>
  </IonSegment>

  

        {/* Autocomplete Suggestions */}
        {suggestions.length > 0 && (
          <IonList className="autocomplete-suggestions">
            {suggestions.map((suggestion, index) => (
              <IonItem key={index} button onClick={() => setCity(suggestion)}>
                {suggestion}
              </IonItem>
            ))}
          </IonList>
        )}

        
        
        {/* Display weather data here */}
        <IonList className="weather-data-container">
        <IonItem>
  <IonIcon slot="start" icon={sunny} />
  <IonLabel>
  {weatherData && weatherData.main
    ? `Temperature: ${temperatureUnit === 'Fahrenheit'
        ? kelvinToFahrenheit(weatherData.main.temp).toFixed(2) + '°F'
        : fahrenheitToCelsius(kelvinToFahrenheit(weatherData.main.temp)).toFixed(2) + '°C'}`
    : 'Loading...'
  }
  </IonLabel>
</IonItem>

          {/* Add more weather information items */}
          <IonItem>
      <IonIcon slot="start" icon={cloud} />
      <IonLabel>
        {humidity !== null ? `Humidity: ${humidity}%` : 'Loading...'}
      </IonLabel>
    </IonItem>
    <IonItem>
      <IonIcon slot="start" icon={speedometer} />
      <IonLabel>
        {windSpeed !== null ? `Wind Speed: ${windSpeed} m/s` : 'Loading...'}
      </IonLabel>
    </IonItem>
    <IonItem>
      <IonIcon slot="start" icon={rainy} />
      <IonLabel>
        {weatherCondition ? `Weather Condition: ${weatherCondition}` : 'Loading...'}
      </IonLabel>
    </IonItem>
          
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default WeatherTab;