import Geolocation from '@react-native-community/geolocation';
import {getDistance} from 'geolib';

const RADIUS = 5000; // 5km

const inRadius = (userLatitude, userLongitude) => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      info => {
        const start = {
          latitude: userLatitude,
          longitude: userLongitude,
        };
        const {latitude, longitude} = info.coords;
        const end = {latitude, longitude};
        const distance = getDistance(start, end);
        resolve(distance <= RADIUS);
      },
      error => {
        reject(error);
      },
      {enableHighAccuracy: true},
    );
  });
};

export {inRadius};
