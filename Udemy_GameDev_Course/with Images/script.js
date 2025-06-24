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
           this.lives = 50;
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
            context.fillStyle = '#0000ff';
            context.fillRect(this.x, this.y, this.width, this.height);
            this.projectiles.forEach(projectile => {
                projectile.draw(context);
            });

            //display health
            context.fillStyle = 'blue';
            context.font = '30px Helvetica';
            context.fillText(this.lives, this.x+34, this.y-5);
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
            this.speedX = Math.random()*-1.5 - 0.5;
            this.lives = 7;
            this.markedforDeletion = false;
        }
        update(){
            this.x += this.speedX;
            if (this.x + this.width < 0) this.markedforDeletion=true; //delete if enemy is out of bounds
        }
        draw(context){
            context.fillStyle = 'red';
            context.fillRect(this.x, this.y, this.width, this.height);

            //display enemies' lives
            context.fillStyle = 'red';
            context.font = '20px Helvetica';
            context.fillText(this.lives, this.x+9, this.y-5);
        }
    }
    class type1Enemy extends Enemy{
        constructor(game){
            super(game); //allows for inheritance of constructor instead of overriding it
                this.width = 228 * 0.2;
                this.height = 169 * 0.2;
                this.y = Math.random() * (this.game.height*0.9-this.height);
                this.score = 3;
        }
    }

    class Layer {
        //handles individual background layers; scrolling mulilayered background
        constructor(game, image, speedModifier){
            this.game = game;
            this.image = image; 
            this.speedModifier = speedModifier;
            this.width = 1768;
            this.height = 500;
            this.x = 0;
            this.y = 0;
        }
        update() {
            if (this.x <= -this.width) this.x = 0;
            else this.x -= (this.game.speed * this.speedModifier);
        }
        draw(context) {
            context.drawImage(this.image, this.x, this.y);
            context.drawImage(this.image, this.x+this.width, this.y); //duplicate image added to give the illusion of a continuous view
        }
    }

    class Background {
        //Pulls all layers together to animate the entire game
        constructor(game) {
            this.game = game;
            this.image1 = document.getElementById('layer1');
            this.image2 = document.getElementById('layer2');
            this.image3 = document.getElementById('layer3');
            this.image4 = document.getElementById('layer4');
            this.layer1 = new Layer(this.game, this.image1, 1)
            this.layer2 = new Layer(this.game, this.image2, 1)
            this.layer3 = new Layer(this.game, this.image3, 1)
            this.layer4 = new Layer(this.game, this.image4, 1)
            this.layers = [this.layer1, this.layer2, this.layer3, this.layer4];

        }
        update() {
            this.layers.forEach(layer => layer.update());
        }
        draw(context) {
            this.layers.forEach(layer => layer.draw(context));
        }
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
            context.save();
                context.font = this.fontSize + 'px ' + this.fontFamily;
                context.fillStyle = this.color;
                context.shadowOffsetX = 2;
                context.shadowOffsetY = 2;
                context.shadowColor = '#540a69';

                //ammo
                for (let x=0; x<this.game.ammo; x++){
                    context.fillRect(20+5*x, 50, 3, 20);
                                //(startingLocation + intermittenSpacing, y-coordinate, rect width, rect height)
                }

                //score
                context.fillText('Score: ' + this.game.score, 20, 40);

                //game timer
                const timeLeft = Math.max(0, this.game.timeLimit - this.game.gameTime); // milliseconds

                if (timeLeft <= 6000) {
                    context.fillStyle = 'red';
                } else {
                    context.fillStyle = 'white';
                }

                const minutes = Math.floor(timeLeft / 60000);
                const seconds = Math.floor((timeLeft % 60000) / 1000);
                const formattedTime = minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
                context.fillText('Time Left: ' + formattedTime, 250, 40);



                //game over messages
                if (this.game.gameOver){
                    context.textAlign = 'center';
                    let message1;
                    let message2;
                    if (this.game.score >= this.game.winningScore){
                        context.fillStyle = 'white';
                        message1 = 'You Win!';
                        message2 = 'Well Done';
                    } else {
                        context.fillStyle = 'red';
                        message1 = 'You Lost!';
                        message2 = 'Try Again';
                    }
                    context.font  = '50px ' + this.fontFamily;
                    context.fillText(message1, this.game.width*0.5, this.game.height*0.5);
                    context.font  = '25px ' + this.fontFamily;
                    context.fillText(message2, this.game.width*0.5, this.game.height*0.5+40);
                }
            context.restore();
        }
    }

    class Game {
        //Main class
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.background = new Background(this);
            this.player = new Player(this);  //creates an instance of Player class
                //the 'this' arg passed refers to the entire Game class
            this.input = new InputHandler(this);
            this.ui = new UI(this);
            this.keys = []; //keeps track of keys pressed
            this.enemies = []; //array for all enemy objects
            this.enemyTimer = 0;
            this.enemyInterval = 1500; //every 5 s, a new enemy spawns
            this.ammo = 20;
            this.maxAmmo = 50;
            this.ammoTimer = 0;
            this.ammoInterval = 3500; //in miliseconds, so = 1s ; every 3.5 seconds, ammo is refilled
            this.score = 0;
            this.winningScore = 10;
            this.gameTime = 0;
            this.timeLimit = 30000;
            this.gameOver = false;
            this.speed = 1;
        }
        update(deltaTime){
            if (!this.gameOver) this.gameTime += deltaTime;
            if (this.gameTime > this.timeLimit) this.gameOver = true;

            this.background.update(); //calls update method of Background obj
            this.player.update(); //calls update method of Player obj
            if (this.ammoTimer > this.ammoInterval){
                if (this.ammo < this.maxAmmo) this.ammo+=5;
                this.ammoTimer = 0; //reset ammo timer
            } else {
                this.ammoTimer += deltaTime;
            }

            this.enemies.forEach(enemy => {
                enemy.update();
                if (this.checkCollision(this.player, enemy)){
                    //player.lives--;
                    enemy.markedforDeletion = true;
                    /*if (player.lives <= 0) {
                        this.gameOver = true;
                    }*/
                }
                this.player.projectiles.forEach(projectile => {
                    if (this.checkCollision(projectile, enemy)) {
                        enemy.lives--;
                        projectile.markedforDeletion = true;
                        if (enemy.lives <= 0) {
                            enemy.markedforDeletion = true;
                            this.score += enemy.score;
                        }
                        if (this.score > this.winningScore) this.gameOver = true;
                    }
                })
            });
            this.enemies = this.enemies.filter(enemy => !enemy.markedforDeletion); //filters out all projectile objects with markedforDeletion set to true
            if (this.enemyTimer > this.enemyInterval && !this.gameOver){
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            
        }
        draw(context){
            this.background.draw(context);
            this.player.draw(context); //calls draw method of Player obj
            this.ui.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
        }
        addEnemy(){
            this.enemies.push(new type1Enemy(this)); //new object of type1Enemy is made and added to "enemies" array
        }
        checkCollision(rect1, rect2){
            return (
                    rect1.x < rect2.x + rect2.width &&
                    rect1.x + rect1.width > rect2.x &&
                    rect1.y < rect2.y + rect2.height &&
                    rect1.y + rect1.height > rect2.y
            )
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
