import "./App.css";
import { Predict } from "./Predict";
import bg from "./bg.png";

function App() {
  return (
    <div
      className="App"
      // style={{ height: "100vh", backgroundImage: `url(${bg})` }}
    >
      <h1>NBA prediction client</h1>
      <Predict />
    </div>
  );
}

export default App;
