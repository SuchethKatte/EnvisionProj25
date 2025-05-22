import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/jsx/Home";
import Game from "./pages/jsx/Game";
import Score from "./pages/jsx/Score";

function App() {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Home></Home>,
    },
    {
      path: "/Game",
      element: <Game></Game>,
    },{
      path:"/Score",
      element:<Score></Score>
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
