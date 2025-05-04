// create array
let numbers = [1, 2, 3, 4, 5, 6];
let numbers2 = [1, 2, 3, 4, 3, 6, 7, 3, 3];


//add to array  (added to the end)
numbers.push(7); //numbers = [1, 2, 3, 4, 5, 6, 7]


//remove from array
numbers.pop(2); //removes specified element ; numbers = [1, 3, 4, 5, 6, 7]
numbers.shift(); //removes the first element (index 0) ; numbers = [3, 4, 5, 6, 7]
numbers.splice(0, 3); //starts at index 0 and removes the following 3 elements ; numbers = [3, 7]
numbers2.filter(n => n !==3); //filters through array and removes all occurence of specified value, in this case 3 ; numbers2 = [1, 2, 4, 6, 7]

//combine arrays/add values
let animals = ['dog', 'cat', 'mouse'];
let noises = ['woof', 'meow', 'squeak'];

let animalNoises = animals.concat(noises);  //animalNoises = ['dog', 'cat', 'mouse', 'woof', 'meow', 'squeak']
let animals2 = animals.concat('horse', 'wolf'); //animals2 = ['dog', 'cat', 'mouse', 'horse', 'wolf']

//create new, edited, array
let newNums2 = numbers2.slice(3, 7); /* newNums2 is given the values from index 3 up to, but not including index 7
                                     newNums2 = [4, 3, 6, 7] */
        //slice() removes indexes w/o modifying the original
animalNoises = animals.slice(1,1).concat(noises.slice(1,1)); //animalNoises = ['mouse', 'squeak']