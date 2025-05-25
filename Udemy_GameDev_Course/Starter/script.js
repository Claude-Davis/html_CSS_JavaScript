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
            this.projectiles = this.projectiles.filter(projectile => !projectile.markedforDeletion);
        }
        draw(context){
            context.fillStyle = '#1babd9';
            context.fillRect(this.x, this.y, this.width, this.height);
            this.projectiles.forEach(projectile => {
                projectile.draw(context);
            });
        }
        shootTop(){
            this.projectiles.push(new Projectile(this.game, this.x, this.y));
            console.log(this.projectiles);
        }
    }

    class Enemy {
        //handles multiple enemy types
    }

    class Layer {
        //handles individual background layers; scrolling mulilayered background
    }

    class Background {
        //Pulls all layers together to animate the entire game
    }

    class UI {
        //Handles score, timer and any other info to be displayed for the user
    }

    class Game {
        //Main class
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.player = new Player(this);  //creates an instance of Player class
                //the 'this' arg passed refers to the entire Game class
            this.input = new InputHandler(this);
            this.keys = []; //keeps track of keys pressed
        }
        update(){
            this.player.update(); //calls update method of Player obj
        }
        draw(context){
            this.player.draw(context); //calls draw method of Player obj
        }
    }

    const game = new Game(canvas.width, canvas.height);
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate); //tells the browser we want to perform an animation; requests that browser calls a specified functino to update an animation before next repaint
            //passing the animation frame the name of its parent function creates an endless loop
    }

    animate();
});
