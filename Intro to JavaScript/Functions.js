

function addition(a, b){
    return a + b;
}

let a = 7;
let b = 68;

//call function "addition"
console.log(addition(a, b));


// //


function hello(name){
    console.log("Hello, " + name + "!");
}

//call function "hello"
hello("Janet");


// //


//arrow fuctions
    /*  useful for anonymous callbacks
        and concise logic */ 
const greet = (name) => {
    console.log("Hello, ${name}!");
};

greet("Jeffery");