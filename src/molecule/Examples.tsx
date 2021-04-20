import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { molecule } from "./molecule";

interface Person {
  name: string;
  age: number;
  action: string;
}

const person = molecule<Person>("peter", {
  name: "peter",
  age: 30,
  action: "run",
});

export const MoleculeInput = () => {
  const [age, setAge] = useRecoilState(person.getAtom("age"));

  return (
    <input
      type="number"
      value={`${age}`}
      onChange={(e) => setAge(+e.target.value)}
    />
  );
};

export const MoleculeAge = () => {
  const age = useRecoilValue(person.getAtom("age"));
  return <div>{age}</div>;
};

export const MoleculeName = () => {
  const name = useRecoilValue(person.getAtom("name"));
  return <div>{name}</div>;
};

export const MoleculeShowAll = () => {
  const peter = useRecoilValue(person.getFull_SLOW);
  const reset = useResetRecoilState(person.getFull_SLOW);

  return (
    <div>
      <pre>{JSON.stringify(peter)}</pre>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export const MoleculeShowOneOfAll = () => {
  const peter = useRecoilValue(person.getFull_SLOW);

  return (
    <div>
      <pre>{peter.action}</pre>
    </div>
  );
};

export const Examples = () => {
  return (
    <>
      <MoleculeInput />
      <MoleculeName />
      <MoleculeAge />
      <MoleculeShowAll />
      <MoleculeShowOneOfAll />
    </>
  );
};
