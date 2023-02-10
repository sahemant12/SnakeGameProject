//Game Constants and Variable
let direction ={x: 0, y: 0};
let foodSound = new Audio('food.mp3');
let gameoverSound = new Audio('gameover.mp3');
let moveSound = new Audio('move.mp3');
let musicSound = new Audio('music.mp3');
let speed=2;

//game function
function main(ctime){ //currentTime
    window.requestAnimationFrame(main); //main will be call again and again so it will create game loop
    console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed){ //every 0.5 second, it will change the screen
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function  gameEngine(){

}







//Main logic starts here
window.requestAnimationFrame(main); //we can also use selfInterval() method for repeated of func for x milseconds (but window.requestAnimationFrame(main); How? check on StackOverFlow)