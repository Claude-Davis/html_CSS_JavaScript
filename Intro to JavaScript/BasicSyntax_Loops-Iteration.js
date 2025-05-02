

//single line comment

/*  multi-line
    comment    */


//JavaScript uses dynamic typing; it does not necesitate the user to declare a variable's type
let num = 78;
let word = "Hello World";
let validity = true;

// the variables' values are flexible; they can be reassigned
let variableName = 50;
variableName = "fifty";
    //this does not cause an error



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


while (x>0){
    console.log(x);
    x--;
}