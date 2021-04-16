import React, { useEffect } from "react";
import { RecoilRoot } from "recoil";
import "./App.css";
import InputName from "./Input";
import { recoilManager } from "./recoiler/recoiler";
import { RecoilerInit } from "./recoiler/RecoilerRoot";
import Show from "./Show";

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
          <InputName recoilKey="person.name" />
          <Show recoilKey="person.name" />
          <Show recoilKey="person.name" />
          <Show recoilKey="person.name" />
          <hr />
          <InputName recoilKey="person.age" />
          <Show recoilKey="person.age" />
          <hr />
          <InputName recoilKey="person.actions.eat" />
          <Show recoilKey="person.actions.eat" />
          <hr />
          <InputName recoilKey="non-existed" />
          <Show recoilKey="non-existed" />
        </header>
      </div>
    </RecoilRoot>
  );
}

export default App;
