import { RecoilRoot } from "recoil";

import "./App.css";
import { Examples } from "./examples/Examples";
import { RecoilerInit } from "./recoiler/RecoilerRoot";

function App() {
  return (
    <RecoilRoot>
      <RecoilerInit />
      <Examples />
    </RecoilRoot>
  );
}

export default App;
