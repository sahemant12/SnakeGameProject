//Game Constants and Variable
let inputDir ={x: 0, y: 0};
let foodSound = new Audio('music/food.mp3');
let gameoverSound = new Audio('music/gameover.mp3');
let moveSound = new Audio('music/move.mp3');
let musicSound = new Audio('music/music.mp3');
let lastPaintTime = 0;
let speed = 10;
let snakeArr = [
    {x:13, y:15} //It is head of snake
]
let food = {x:5, y:15}; //food is not an array since it is a particle(not increasing)
let score = 0;

//game function
function main(ctime){ //currentTime
    window.requestAnimationFrame(main); //main will be call again and again so it will create game loop
    //console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed){ //every 0.5 second, it will change the screen
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(snake){
    //snake bump into the own body
    for (let i = 1; i < snake.length; i++) {
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            return true;
        }
    }
    //snake bump into wall
    if(snake[0].x > 25 || snake[0].x < 1 || snake[0].y > 25 || snake[0].y < 1 ){
        return true;
    }
}

function gameEngine(){
 
    //Part-1: Updating the snake and food
    if(isCollide(snakeArr)){
        gameoverSound.play();
        moveSound.pause();
        inputDir ={x: 0, y: 0};
        alert("Game Over! Press any key to play again");
        snakeArr=[ {x:13, y:15}];
       // musicSound.play();
       score=0;
       scoreBox.innerHTML = "Score: "+ score;;
    }

    //If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        score+=1;
        scoreBox.innerHTML = "Score: "+ score;
        foodSound.play();
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y})// snakeArr[0].x = Adding head to the snake body && inputDir.x = in the current direction

        //Generating Food randomly
        let a=2;
        let b=18;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())} //a&b is the number between which we have to generate random food


    }

    //Moving the snake
    for(let i=snakeArr.length-2; i>=0; i--){ // snakeArr.length-2 = 2nd last element of array
        snakeArr[i+1] = {... snakeArr[i]}; //Passing referencing(don't understood properly now check later)
    }
    //for head of snake
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //Part-2: Display the snake and food
    //Display the snake
        board.innerHTML="" //clear the board
        snakeArr.forEach((e,index)=>{  //e=currentElementOfArray 
        snakeElement = document.createElement('div'); //creating div element and storing it in snakeElement
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index==0){
            snakeElement.classList.add('head'); 
        }else{
            snakeElement.classList.add('snake'); 
        }
        board.appendChild(snakeElement); //adding snake element to the board 
   })

    //Display the food
    foodElement = document.createElement('div'); 
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food'); 
    board.appendChild(foodElement);
}





//Main logic starts here
window.requestAnimationFrame(main); //we can also use selfInterval() method for repeated of func for x milseconds (but window.requestAnimationFrame(main); How? check on StackOverFlow)

window.addEventListener('keydown',e=>{ //keydown = press any key
    inputDir={x:0, y:1} //start the game
    moveSound.play();
    switch (e.key) {  //checking which keyboard is pressed
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x=0
            inputDir.y=-1
            break;
    
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x=0
            inputDir.y=1
            break;
    
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x=-1
            inputDir.y=0
            break;
    
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x=1
            inputDir.y=0
            break;
    
        default:
            break;
    }
})