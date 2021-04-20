import { useEffect } from "react";
import "./App.css";
import Input from "../Input";
import InputObject from "../InputObject";
import { recoilManager } from "./recoiler";
import Show from "../Show";

function RecoilerExamples() {
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
    <>
      <Input recoilKey="person.name" />
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
    </>
  );
}

export default RecoilerExamples;
