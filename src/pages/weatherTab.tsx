import React, { useState, useEffect } from 'react';
import {
  IonButton, 
  IonInput,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonList,
  IonItem,
  IonIcon,
} from '@ionic/react';

import { sunny } from 'ionicons/icons'; // Import icon here
import './weatherTab.css'; //import css here
import axios from 'axios';

const WeatherTab: React.FC = () => {

  const [city, setCity] = useState(''); // Set Default city here
  const [weatherData, setWeatherData] = useState<any | null>(null);

  // Weather Fetching Logic
  useEffect(() => {
   
    // API key for OpenWeatherMap goes here
    const apiKey = '8c1bc17647319a23fbee25bc0228efe2';
                                                                                        // const city = 'detroit'; // Replace with your desired city

    // Make an API request to OpenWeatherMap
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching weather data', error);
      });
    }, [city]);

   // Function to convert Kelvin to Fahrenheit
   const kelvinToFahrenheit = (kelvin: number) => {
    return (kelvin - 273.15) * 9/5 + 32; // Conversion formula
  };

   // Function to handle the search button click
   const handleSearch = () => {
    // Update the weather data for the selected city
    // The useEffect hook will fetch the new data
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
          <IonItem>
            <IonInput
              type="text"
              placeholder="Enter city name"
              value={city}
              onIonChange={(e) => setCity(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonButton expand="full" onClick={handleSearch}>
              Search
            </IonButton>
          </IonItem>
        </IonList>
        {/* Display weather data here */}
        <IonList className="weather-data-container">
        <IonItem>
  <IonIcon slot="start" icon={sunny} />
  <IonLabel>
    {weatherData && weatherData.main
      ? `Temperature: ${kelvinToFahrenheit(weatherData.main.temp).toFixed(2)}°F`
      : 'Loading...'
    }
  </IonLabel>
</IonItem>

          {/* Add more weather information items */}
          
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default WeatherTab;