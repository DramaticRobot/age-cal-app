import "./App.css";
import AgeInput from "./components/AgeInput";

function App() {
  return (
    <div className="bk">
      <div className="appContainerParent">
        <div className="appContainer">
          <div className="ageInput">
            <AgeInput />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
