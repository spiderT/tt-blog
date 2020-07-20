
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
// console.log(entries.next());
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']