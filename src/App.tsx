import { RecoilRoot } from "recoil";

import "./App.css";
import { Examples } from "./molecule/Examples";
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
