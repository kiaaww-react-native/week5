import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {
  const [region, setRegion] = useState(null); // To hold the map region
  const [markers, setMarkers] = useState([]); // To hold the selected marker's coordinates

  // Request user location permission and get current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission denied", "Enable location to use the map");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  // Handle the long press on the map to add a marker
  const showMarker = (e) => {
    const coords = e.nativeEvent.coordinate;
    setMarkers((prevMarkers) => [
      ...prevMarkers,
      { id: Date.now(), latitude: coords.latitude, longitude: coords.longitude }
    ]);
  };

  return (
    <View style={styles.container}>
      {region ? (
        <MapView
          style={styles.map}
          region={region} 
          onLongPress={showMarker}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            />
          ))}
        </MapView>
      ) : (
        <View><Text>Loading map...</Text></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});