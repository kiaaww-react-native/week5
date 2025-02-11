import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {
  const [initialRegion, setInitialRegion] = useState(null); // Start region (only set once)
  const [region, setRegion] = useState(null); // Track map movement
  const [markers, setMarkers] = useState([]); // Store multiple markers
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission denied", "Enable location to use the map");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const newRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      
      setInitialRegion(newRegion); // Set only once
      setRegion(newRegion); // Set region so it tracks movement
    })();
  }, []);

  const showMarker = (e) => {
    const coords = e.nativeEvent.coordinate;
    setMarkers((prevMarkers) => [
      ...prevMarkers,
      { id: Date.now(), latitude: coords.latitude, longitude: coords.longitude }
    ]);
     setMapKey((prevKey) => prevKey + 1);
  };

  return (
    <View style={styles.container}>
      {initialRegion ? (
        <MapView
          key={mapKey} 
          style={styles.map}
          initialRegion={initialRegion} // Set only once at start
          region={region} // Track user movement but not force reset
          onRegionChangeComplete={setRegion} // Update region only when user moves
          onLongPress={showMarker} // Add marker without affecting region
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