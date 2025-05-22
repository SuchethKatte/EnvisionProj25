import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function Map({ onGuess } = {}) {
  useEffect(() => {
    const map = L.map("map").setView([0, 80], 3);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    let currentMarker = null;

    map.on("click", function (e) {
      const { lat, lng } = e.latlng;

      if (currentMarker) {
        map.removeLayer(currentMarker);
      }

      currentMarker = L.marker([lat, lng])
        .addTo(map)
        .bindPopup(`Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`)
        .openPopup();
      
      onGuess({ lat, lng });

      console.log("Selected coordinate:", { lat, lng });
    });

    // Clean up map on component unmount
    return () => {
      map.remove();
    };
  }, [onGuess]);

  return <div id="map" style={{ height: "100%", width: "100%" }}></div>;
}

export default Map;