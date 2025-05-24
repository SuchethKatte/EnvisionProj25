import { useEffect, useRef, useState } from "react";
import { Viewer } from "mapillary-js";
import MapLoader from "./MapLoader";

const View = ({ setTrueCoords, setImageLoaded }) => {
  const containerRef = useRef(null);
  const accessToken = import.meta.env.VITE_MAPILLARY_TOKEN;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!containerRef.current) return;

    const viewer = new Viewer({
      accessToken,
      container: containerRef.current,
    });

    const loadRandomImage = async () => {
      setIsLoading(true);
      setImageLoaded(false);
      // 🌍 Generate random lat/lng on Earth
      const randomLat = Math.random() * 140 - 70; // -70 to 70
      const randomLng = Math.random() * 360 - 180; // -180 to 180
      const buffer = 0.05;
      const BBOX = [
        randomLng - buffer,
        randomLat - buffer,
        randomLng + buffer,
        randomLat + buffer,
      ];

      const url = `https://graph.mapillary.com/images?fields=id,geometry&bbox=${BBOX.join(",")}&limit=10`;

      try {
        const response = await fetch(url, {
          headers: { Authorization: `OAuth ${accessToken}` },
        });
        const data = await response.json();

        if (!data.data.length) {
          console.warn("No images found. Retrying...");
          loadRandomImage(); // Retry
          return;
        }
        else{
            const randomImage =
              data.data[Math.floor(Math.random() * data.data.length)];

            viewer.moveTo(randomImage.id).then(() => {
              const [lng, lat] = randomImage.geometry.coordinates;
              console.log(`True Location: ${lat}, ${lng}`);
              setTrueCoords({ lat, lng });
              setImageLoaded(true); // ✅ Let Game.jsx start timer
              setIsLoading(false);
            });
          }
      } catch (e) {
        console.error(e);
        setImageLoaded(false);
        setIsLoading(true);
      }
    };
    loadRandomImage();

    return () => viewer.remove();
  }, [accessToken, setTrueCoords, setImageLoaded]);

  return (
  <div style={{ width: "100%", height: "100%", position: "relative" }}>
    {isLoading&&<MapLoader/>}
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    />
  </div>
);


};

export default View;
