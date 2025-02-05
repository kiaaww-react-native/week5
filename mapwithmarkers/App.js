import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {
  const [region, setRegion] = useState(null); // To hold the map's region
  const [markers, setMarkers] = useState([]); // To hold the selected marker's coordinates
  const mapRef = useRef(null);
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

  // Handle map press to add a marker
  const handleLongPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    console.log("Long press detected at:", latitude, longitude);

    setMarkers((prevMarkers) => [
      ...prevMarkers,
      { id: Date.now(), latitude, longitude },
    ]);
  };

  return (
    <View style={styles.container}>
      {region ? (
        <MapView
          ref={mapRef}
          style={styles.map}
          region={region} // Use region to control the map view
          onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
          onLongPress={handleLongPress} // Add marker on map press
          key={markers.length}
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
