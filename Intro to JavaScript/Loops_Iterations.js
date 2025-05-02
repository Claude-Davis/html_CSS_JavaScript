let x = 7;
if (x>5) {
    console.log("Greater than 5.");
} else if (x === 5) {
    console.log("Is 5.");
} else {
    console.log("Less than 5.");
}

//use this for iterating keys of objects
for (let i=0; i<5; i++){ 
    console.log(i);
}


//use this for iterating values in arrays or iterable objects
let fruits = ["apple", "peach", "mango", "tomato???", "lemon", "banana", "strawberry"];
for (let index in fruits) {
    console.log(index);
    console.log(fruits[index]);
}


while (x>0){
    console.log(x);
    x--;
}