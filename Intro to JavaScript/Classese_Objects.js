//CREATE CLASS
class Dog {
    //attributes; modifiers include public, protected (not built-in, can be simulated), private and static
    name; //public
    #color; //private

    //constructor w/o arguments
    constructor() {
        this.name = "Rover";
        this.color = "red merle";
    }

    //constructor w/ arguments
    constructor(n, c) {
        this.name = n;
        this.color = c;
    }

    //methods
    introduction() {
        console.log("This ${color} dog is named ${name}");
    }
    bark() {
        console.log("${name}: 'bark, bark! woof!' ");
    }

    //getter method
    getColor(){
        return this.#color;
    }
}

//INSTANCE OF CLASS
let d1 = new Dog();
let d2 = new Dog("Rowdy", "sable");

//call instance method
d2.bark();
d1.introduction();


//SUBCLASSES
class Puppy extends Dog{
    age; //in months

    constructor() {
        super(name, color);
        this.age = 5;
    }
    constructor(n, c, a) {
        super(name, color);
        this.age = a;
    }

    cry() {
        console.log("The puppy, ${name}, is crying.");
    }
}