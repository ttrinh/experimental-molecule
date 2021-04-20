import React, { useEffect } from "react";
import { RecoilRoot } from "recoil";
import "./App.css";
import Input from "./Input";
import InputObject from "./InputObject";
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
          <Input recoilKey="person.name" />
          <Show recoilKey="person.name" />
          <Show recoilKey="person.name" />
          <Show recoilKey="person.name" />
          <hr />
          <Input recoilKey="person.age" />
          <Show recoilKey="person.age" />
          <hr />
          <Input recoilKey="person.actions.eat" />
          <Show recoilKey="person.actions.eat" />
          <hr />
          <InputObject />
          <Show recoilKey="person" />
          <hr />
          <Input recoilKey="non-existed" />
          <Show recoilKey="non-existed" />
        </header>
      </div>
    </RecoilRoot>
  );
}

export default App;
