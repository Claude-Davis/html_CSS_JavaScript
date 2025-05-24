window.addEventListener('load', function(){ //LOAD EVENT: executes when the whole page/all dependent sources have loaded
    //canvas set-up
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');  //DRAWING CONTEXT: a built-in obj containing all methods/properties that allow users to draw/animate colors, shapes, and other graphics html canvas.
    canvas.width = 500; //in pixels
    canvas.height = 500; //in pixels


    class InputHandler {
        //
    }

    class Projectile {
        //
    }

    class Particle {
        //
    }

    class Player {
        constructor(game){
           this.gme = game; 
           this.width = 120;
           this.height = 190;
           this.x = 20;
           this.y = 100;
           this.speed = 0;
        }
        update(){
            this.y += this.speed;
            //
        }
        draw(context){
            context.fillRect(this.x. this.y, this.width, this.height);
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
        }
        update(){
            this.player.update(); //calls update method of Player obj
        }
        draw(context){
            this.player.draw(context); //calls draw method of Player obj
        }
    }

    const game = new Game(canvas.width, canvas.height);
    //
});
