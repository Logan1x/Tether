import "./App.css";
import { Routes } from "./routes";
import { Nav } from "./components";

function App() {
  return (
    <div className="min-h-screen bg-primary text-paragraphLight text-lg flex flex-col">
      <Nav />
      <Routes />
    </div>
  );
}

export default App;
