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
} from '@ionic/react';

import { sunny } from 'ionicons/icons'; // Import icon here
import './weatherTab.css'; //import css here
import axios from 'axios';

const WeatherTab: React.FC = () => {
  // Weather Fetching Logic











  return (
    <IonPage>
      <IonHeader className="weather-header">
        <IonToolbar>
          <IonTitle>Weather Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* Display weather data here */}
        <IonList className="weather-data-container">
          <IonItem>
            <IonIcon slot="start" icon={sunny} />
            <IonLabel>Temperature: XX°C</IonLabel>
          </IonItem>
          {/* Add more weather information items */}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default WeatherTab;