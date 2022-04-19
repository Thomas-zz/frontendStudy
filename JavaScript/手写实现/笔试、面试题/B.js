// 和 A.js 一起看
const animalA = require("./A");
const animalB = require("./A");

animalA.animalList.push("dog");
animalB.animalList.push("bird");

animalA.showAnimal();
animalB.showAnimal();
