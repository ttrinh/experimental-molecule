```ts
interface MoleculeType<T extends string | number | 'array' | 'object'> {
  type: T;
  atom: Recoil<T>;
  selector: Selector<T>;
}

interface Person {
  id: string;
  name: string;
  age: number;
  isDev?: boolean;
}

interface UI {
  active: string[];
  theme: 'bright' | 'dark';
}
```

```ts
const people = moleculeManager<Person>();

/* METHODS */
people.add({ id: "jon", name: "Jon", age: 30, isDev: true });
people.add({ id: "sarah", name: "Sarah", age: 46 });
people.add({ id: "sarah2", name: "Sarah", age: 30, isDev: true });
people.add({ id: "peter", name: "Peter", age: 19 });

/* GETTERS */
// query one by attributes or id => molecule
const jon = people.find({ name: "Jon" });
const sarah = people.find({ id: "sarah" });
// query all by attributes or ids => array molecule
const sarahs = people.findAll({ name: "Sarah" });

/* CHAINABLE */
// const jonAgeAtom = people.find({ name: 'Jon' }).age; // ❌  as find might return an empty molecule
const jonAgeAtom = people.find({ name: "Jon" }).getAtom("age");
```

```ts
interface GlobalState {
  personList: Person[];
  ui: UI;
}

const globalState: Molecule<GlobalState>({
  personList: [];
  ui: {
    active: [],
    theme: 'dark',
  },
});

// Retrievable keys
// 'personList'
// 'ui'
// 'ui.active'
// 'ui.theme'

// get UI
const uiAtom: Selector<UI | undefined> = globalState.get('ui.theme');
// get a specific UI key
const themeAtom: Recoil<UI['theme'] | undefined> = globalState.get('ui.theme');

// get person full info
const jonAtom: Selector<Person | undefined> = globalState.get('personList').find({ id: 'jon' }).getShape();
// get person age specifically
const jonAge: Recoil<Person['age'] | undefined> = globalState.get('personList').find({ name: 'Jon' }).get('age');
```
