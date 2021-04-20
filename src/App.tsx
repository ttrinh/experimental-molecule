import { useEffect } from "react";
import { RecoilRoot } from "recoil";

import "./App.css";
import { Examples } from "./molecule/Examples";
import { recoilManager } from "./recoiler/recoiler";
import { RecoilerInit } from "./recoiler/RecoilerRoot";

function App() {
  useEffect(() => {
    recoilManager.createEntity({
      key: "person",
      defaultValue: {
        name: "John Doe",
        age: 20,
        actions: {
          eat: "taco",
        },
      },
    });
  }, []);

  return (
    <RecoilRoot>
      <RecoilerInit />

      <div className="App">
        <header className="App-header">
          <Examples />
        </header>
      </div>
    </RecoilRoot>
  );
}

export default App;
