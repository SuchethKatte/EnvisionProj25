import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function MapScore({ guessCoords, defaultLocation }) {
  useEffect(() => {
    if (!guessCoords || !defaultLocation) return;
    
    const map = L.map("map").setView([0, 0], 1);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Custom icons
    const guessIcon = L.icon({
      iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });

    const defaultIcon = L.icon({
      iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      className: 'default-marker'
    });

    // Add markers
    L.marker([guessCoords.lat, guessCoords.lng], { icon: guessIcon })
      .addTo(map)
      .bindPopup("Your Guess")
      .openPopup();

    L.marker([defaultLocation.lat, defaultLocation.lng], { icon: defaultIcon })
      .addTo(map)
      .bindPopup("Default Location")
      .openPopup();

    // Draw connecting line
    const polyline = L.polyline([
      [guessCoords.lat, guessCoords.lng],
      [defaultLocation.lat, defaultLocation.lng]
    ], { color: 'blue' }).addTo(map);

    // Fit bounds to show both markers
    map.fitBounds([
      [guessCoords.lat, guessCoords.lng],
      [defaultLocation.lat, defaultLocation.lng]
    ]);

    return () => map.remove();
  }, [guessCoords, defaultLocation]);

  return <div id="map" style={{ height: "100%", width: "100%" }}></div>;
}

export default MapScore;