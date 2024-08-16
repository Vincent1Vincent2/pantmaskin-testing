import "./App.css";
import RecyclingMachine from "./components/RecyclingMachine/RecyclingMachine";

function App() {
  return (
    <>
      <main className="main">
        <h1 className="heading">RECYCLING RECYCLING!</h1>
        <RecyclingMachine />
      </main>
      <div className="onlyDesktop">
        <h2>THIS IS A DESKTOP APPLICATION AND DOESN'T WORK ON MOBILE</h2>
      </div>
    </>
  );
}

export default App;
