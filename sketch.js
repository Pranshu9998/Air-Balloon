var ball;
function preload(){
    backgroundImage = loadImage("cityImage.png")
    ballAnimation1=loadAnimation("hotairballoon1.png")
    ballAnimation2=loadAnimation("hotairballoon1.png","hotairballoon2.png","hotairballoon3.png")
}
function setup(){
    database = firebase.database()
    createCanvas(1500,700);
    ball = createSprite(250,650,150,150);
    ball.addAnimation("ball1",ballAnimation1)
    ball.scale = 0.5;
    ballref = database.ref("ball/position")
    ballref.on("value", readPosition, errorMessage)
    textSize(20)
}

function draw(){
    background(backgroundImage);
    if(keyDown(LEFT_ARROW)){
        updatePosition(-10,0);
        ball.addAnimation("ball1", ballAnimation2)
    }
    else if(keyDown(RIGHT_ARROW)){
        updatePosition(10,0);
        ball.addAnimation("ball1", ballAnimation2)
    }
    else if(keyDown(UP_ARROW)){
        updatePosition(0,-10);
        ball.addAnimation("ball1", ballAnimation2)
        ball.scale=ball.scale-0.005
    }
    else if(keyDown(DOWN_ARROW)){
        updatePosition(0,+10);
        ball.addAnimation("ball1", ballAnimation2)
        ball.scale=ball.scale+0.005
    }
    drawSprites();
    fill (0)
    stroke ("white")
    textSize(25)
    text("Use Arrow Key To Move Balloon",40,40)
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}
function readPosition(data){
    position = data.val()
    ball.x = position.x
    ball.y = position.y
}
function updatePosition(x,y){
    database.ref('ball/position').update({
        x:position.x+x,
        y:position.y+y
    })
}
function errorMessage(){
    console.log("error in database")
}