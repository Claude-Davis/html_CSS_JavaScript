window.addEventListener('load', function(){ //LOAD EVENT: executes when the whole page/all dependent sources have loaded
    //canvas set-up
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');  //DRAWING CONTEXT: a built-in obj containing all methods/properties that allow users to draw/animate colors, shapes, and other graphics html canvas.
    canvas.width = 500; //in pixels
    canvas.height = 500; //in pixels


    class InputHandler {
        constructor(game){
            this.game = game;
            window.addEventListener('keydown', e => {  
                if (( (e.key === 'ArrowUp') ||
                      (e.key === 'ArrowDown') ||
                      (e.key === 'ArrowRight') ||
                      (e.key === 'ArrowLeft')
                    ) && this.game.keys.indexOf(e.key) === -1) this.game.keys.push(e.key); //the key is pushed into the array 'keys' (Game constructor)
                else if (e.key === ' ') this.game.player.shootTop(); 
                console.log(this.game.keys);
            });
            window.addEventListener('keyup', e => {
                //indexOf() method returns the first index at which a given element can be found in an array; returns -1 if theelement is not present
                if (this.game.keys.indexOf(e.key) > -1) {
                    this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
                }
                console.log(this.game.keys);
            })
        }
    }

    class Projectile {
        constructor(game, x, y) {
            this.game = game;
            this.x = x;
            this.y = y;
            this.width = 10;
            this.height = 5;
            this.speed = 5;
            this.markedforDeletion = false;
        }
        update() {
            this.x += this.speed;
            if (this.x > this.game.width*0.8) this.markedforDeletion = true;
        }
        draw(context) {
            context.fillStyle = '#d9e81a';
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    class Particle {
        //
    }

    class Player {
        constructor(game){
           this.game = game; 
           this.width = 120;
           this.height = 190;
           this.x = 20;
           this.y = 100;
           this.speedY = 0;  
           this.speedX = 0;
           this.projectiles = [];
        }
        update(){
            //y-axis
            if (this.game.keys.includes('ArrowUp')) this.speedY = -2;
            else if (this.game.keys.includes('ArrowDown')) this.speedY = 2;
            else this.speedY = 0;  //stops movement if U/D arrows are not pressed
            this.y += this.speedY;

            //x-axis
            if (this.game.keys.includes('ArrowRight')) this.speedX = 2;
            else if (this.game.keys.includes('ArrowLeft')) this.speedX = -2;
            else this.speedX = 0; //stops movement if R/L arrows are not pressed
            this.x += this.speedX;

            //projectiles
            this.projectiles.forEach(projectile => {
                projectile.update();
            });
                    //javascript's filter method
            this.projectiles = this.projectiles.filter(projectile => !projectile.markedforDeletion); //filters out all projectile objects with markedforDeletion set to true
        }
        draw(context){
            context.fillStyle = '#1babd9';
            context.fillRect(this.x, this.y, this.width, this.height);
            this.projectiles.forEach(projectile => {
                projectile.draw(context);
            });
        }
        shootTop(){
            if (this.game.ammo > 0){
                this.projectiles.push(new Projectile(this.game, this.x, this.y));
                this.game.ammo -= 1;  //or this.game.amm0--;
                console.log(this.projectiles);
            }
        }
    }

    class Enemy {
        //handles multiple enemy types
        constructor(game) {
            this.game = game;
            this.x = this.game.width;  
            this.speedX = Math.random()*-1.5 - 0.5;;
            this.markedforDeletion = false;
        }
        update(){
            this.x += this.speedX;
            if (this.x + this.width < 0) this.markedforDeletion=true; //delete if enemy is out of bounds
        }
        draw(context){
            context.fillStyle = 'red';
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }
            class type1Enemy extends Enemy{
                constructor(game){
                    super(game); //allows for inheritance of constructor instead of overriding it
                    this.width = 228;
                    this.height = 169;
                    this.y = Math.random() * (this.game.height*0.9-this.height);
                }
            }

    class Layer {
        //handles individual background layers; scrolling mulilayered background
    }

    class Background {
        //Pulls all layers together to animate the entire game
    }

    class UI {
        //Handles score, timer and any other info to be displayed for the user
        constructor(game){
            this.game = game;
            this.fontSize = 25;
            this.fontFamily = 'Helvetica';//Lucida Console
            this.color = 'yellow';
            this.color2 = 'white';
        }
        draw(context){
            //ammo
            context.fillStyle = this.color;
            for (let x=0; x<this.game.ammo; x++){
                context.fillRect(20+5*x, 50, 3, 20);
                              //(startingLocation + intermittenSpacing, y-coordinate, rect width, rect height)
            }
        }
        update(){
            //
        }
    }

    class Game {
        //Main class
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.player = new Player(this);  //creates an instance of Player class
                //the 'this' arg passed refers to the entire Game class
            this.input = new InputHandler(this);
            this.ui = new UI(this);
            this.keys = []; //keeps track of keys pressed
            this.enemies = []; //array for all enemy objects
            this.enemyTimer = 0;
            this.enemyInterval = 5000; //every 5 s, a new enemy spawns
            this.ammo = 20;
            this.maxAmmo = 50;
            this.ammoTimer = 0;
            this.ammoInterval = 3500; //in miliseconds, so = 1s ; every 3.5 seconds, ammo is refilled
            this.gameOver = false;
        }
        update(deltaTime){
            this.player.update(); //calls update method of Player obj
            if (this.ammoTimer > this.ammoInterval){
                if (this.ammo < this.maxAmmo) this.ammo+=5;
                this.ammoTimer = 0; //reset ammo timer
            } else {
                this.ammoTimer += deltaTime;
            }

            this.enemies.forEach(enemy => {
                enemy.update();
            });
            this.enemies = this.enemies.filter(enemy => !markedforDeletion)//filters out all projectile objects with markedforDeletion set to true
            if (this.enemyTimer > this.enemyInterval && !this.gameOver){
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            
        }
        draw(context){
            this.player.draw(context); //calls draw method of Player obj
            this.ui.draw(context);
        }
        addEnemy(){
            this.enemies.push(new type1Enemy(this)); //new object of type1Enemy is made and added to "enemies" array
        }
    }

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0; //will be used to store the timestamp of the previous animation loop
    
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate); //tells the browser we want to perform an animation; requests that browser calls a specified functino to update an animation before next repaint
            //passing the animation frame the name of its parent function creates an endless loop
            //requestAnimationFrame auto. passes the timeStamp as an arg. to the function it calls (ie 'animate')
    }

    animate(0);
});
