//To create the World,Engine,Bodies,constraints which make game look real
const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

//to create the all objects
var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

//to make gamestate , background and score
var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;

//to load images
function preload() {
    getBackgroundImg();
}

//to setup the gane
function setup(){

    //to create canvas
    var canvas = createCanvas(1200,400);

    //to create world and engine
    engine = Engine.create();
    world = engine.world;

//to make the platform and the ground
    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    //to make all object used in angrybirds game
    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    //to make the slingshot
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

//to draw everything
function draw(){
    //make background
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
    
        //to update Engine
    Engine.update(engine);

    //to display all the objects
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    slingshot.display();    
}

//to give the bird velocity to launch
function mouseDragged(){
    //if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    //}
}

//to launch the bird whenever mouse is released
function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

//to restart the game
function keyPressed(){
    if(keyCode === 32){
       bird.trajectory = []
       Matter.Body.setPosition(bird.body,{x:200 , y:250})
       slingshot.attach(bird.body);
    }
}

//to change the backgound according to time
async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=0600 && hour<=1900){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}