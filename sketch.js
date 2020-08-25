const PLAY = 1;
const END = 0;
var gameState = PLAY;
var background_img;
var backgr;
var astronaut_Flying_img;
var astronaut_Flying;
var asteroids_img, alien_img;
var asteroidGroup, alienGroup;
var gameEndSound;


function preload() 
{
    background_img = loadImage("assets/images/space-background.png");
    astronaut_Flying_img = loadImage("assets/images/astronaut3.png");
    asteroids_img = loadImage("assets/images/asteroids.png");
    alien_img = loadImage("assets/images/alien.png");

    gameEndSound = loadSound("assets/sound/destroySound.mp3");
}

function setup()
{
    var canvas = createCanvas(1200,1200);

   //adding background and giving velocity
    asteroidGroup = new Group();
    alienGroup = new Group();


    backgr = createSprite(0,0,1200,1200);
    backgr.addImage(background_img);
    backgr.y=backgr.height/2;
    backgr.velocityY = 4;
    backgr.scale = 4;

    //Flying astronaut
    astronautFlying =  createSprite(600,600,20,20);
    astronautFlying.addImage(astronaut_Flying_img);
    astronautFlying.scale = 0.12;
   

    //Creating asteroids
    
    
    

    
}

function draw(){
    background(0);
    astronautFlying.x = World.mouseX;

    if(gameState === PLAY)
    {
        asteroids();
        aliens();
        
        if (backgr.y > 400) 
        {
            backgr.y = backgr.height/2;
        }

        //if asteroids hit astronaut
        if(asteroidGroup.isTouching(astronautFlying) || alienGroup.isTouching(astronautFlying))
        {
            gameState = END;
            gameEndSound.play();
        }
    }
    else if(gameState === END){
        
        backgr.velocityY = 0;
        asteroidGroup.destroyEach();
        asteroidGroup.setVelocityYEach(0);
        asteroidGroup.setLifetimeEach(-1);
        alienGroup.destroyEach();
        alienGroup.setVelocityYEach(0);
        alienGroup.setLifetimeEach(-1);
    }
    

    drawSprites();
}

function asteroids(){
    console.log(World.frameCount);
    if(World.frameCount % 60 === 0){
        asteroid = createSprite(random(100,800),0,40,40);
        asteroid.addImage(asteroids_img);
        asteroid.velocityY = 5;
        asteroid.lifetime = 240;
        asteroidGroup.add(asteroid);
        
    }
}

function aliens(){
    console.log(World.frameCount);
    if(World.frameCount % 150 === 0){
        alien = createSprite(random(50,700),0,40,40);
        alien.scale = 2;
        alien.addImage(alien_img);
        alien.velocityY = 5;
        alien.lifetime = 240;
        alienGroup.add(alien);
        
    }
}


