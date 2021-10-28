```ts
interface Person {
  id: string;
  name: string;
  age: number;
  isDev?: boolean;
}

const people = moleculeManager<Person>(); 

/* METHODS */
people.add({ id: 'jon', name: 'Jon', age: 30, isDev: true });
people.add({ id: 'sarah', name: 'Sarah', age: 46 });
people.add({ id: 'sarah2', name: 'Sarah', age: 30, isDev: true });
people.add({ id: 'peter', name: 'Peter', age: 19 });

/* GETTERS */
// query one by attributes or id => molecule
const jon = people.find({ name: 'Jon' });
const sarah = people.find({ id: 'sarah' });
// query all by attributes or ids => array molecule
const sarahs = people.findAll({ name: 'Sarah' });

/* CHAINABLE */
// const jonAgeAtom = people.find({ name: 'Jon' }).age; // ❌  as find might return an empty molecule
const jonAgeAtom = people.find({ name: 'Jon' }).getAtom('age');
```