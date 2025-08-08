import { RouterProvider } from "react-router-dom";
import "./App.css";
import root from "./router/root";
import ScrollUpButton from "./components/ScrollUpButton";

function App() {
  return (
    <>
      <RouterProvider router={root} />
      <ScrollUpButton />
    </>
  );
}

export default App;
