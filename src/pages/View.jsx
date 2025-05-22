import { useEffect, useRef } from "react";
import { Viewer } from "mapillary-js";
import "./View.css"

const View = () => {
  /* TODO:create a .env file in the root project directory
   add the name of the file in the .gitignore (as soon the save the gitignore file after adding name the filename in the file panel becomes dim)
   add the key as VITE_MAPPILLARY_TOKEN = "access_token" (client_token) in mappillary user profile
   */
  const container = document.createElement('div');
  container.style.width = '400px';
  container.style.height = '300px';
  document.body.appendChild(container);


  const containerRef = useRef(null);
  const accessToken = import.meta.env.VITE_MAPILLARY_TOKEN;

  useEffect(() => {
    
    if (!containerRef.current) return;

    const viewer = new Viewer({
      accessToken,
      container: containerRef.current,
      cover: false, // Disable the cover screen
      component: {
        cover: false, // Disable cover component
      },

    });

    const loadRandomImage = async () => {
      //TODO : edit this part to take into account the whole world
      const BBOX = [-74.01, 40.7, -73.97, 40.74];
      const url = `https://graph.mapillary.com/images?fields=id,geometry&bbox=${BBOX.join(
        ","
      )}&limit=20`;

      try {
        const response = await fetch(url, {
          headers: { Authorization: `OAuth ${accessToken}` },
        });
        const data = await response.json();

        if (!data.data.length) {
          console.warn("No images found.");
          return;
        }

        const randomImage =
          data.data[Math.floor(Math.random() * data.data.length)];

        viewer.moveTo(randomImage.id).then(() => {
          //TODO: declare these variables outside the try-catch block to send the coordinates from Games to score routes
          const [lng, lat] = randomImage.geometry.coordinates;
          console.log(`${lat}, ${lng}`);
        });
      } catch (e) {
        console.error(e);
      }
    };

    //TODO: try to find a way to start timer element when the image has already loaded
    loadRandomImage();

    return () => viewer.remove();
  }, [accessToken]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default View;
