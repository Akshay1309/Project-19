
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var path,pathImg;
var coin, coinImg;
var obstacle, obstacleImg;
var score;
var car, carImg

function preload(){
carImg = loadImage("car.png");
coinImg = loadImage("coin.png");
obstacle = loadImage("stone.png");
pathImg = loadImage("track.png")
}

function setup() {
    createCanvas(500,500);
  
  path = createSprite(250,50);
  path.addImage(pathImg);
  path.velocityY = -1;
  path.scale = 5;

  car = createSprite(257,100,250,250);
  car.addImage(carImg);
  car.scale = 0.1;


  
  coinGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;


   }
   

function draw() {
 
  if(gameState === PLAY){

    if(path.x < 0){
      path.x = track.width/5;
  }

  if(keyDown("right_arrow")){
    car.x = car.x + 1;  
  }
    if(keyDown("left_arrow")){
      car.x = car.x  -1;  
    }
    
    if(car.isTouching(coinGroup)){
      coinGroup.destroyEach();
      score = score + 1;
  }  
   
  spawnCoins();
  spawnObstacles();
  }
  if(car.isTouching(obstacleGroup)){
    coinGroup.destroyEach();
    obstacleGroup.destroyEach();
    track.velocityX = 0;
    gameState = END  

  }

  else if(gameState === END){
    
    score = 0;

    stroke("black");
    fill("yellow");
    textSize(20);
    text("GAME FINISHED",100,40);
  }
    drawSprites();

    stroke("Green");
    fill("white");
    textSize(15);
    text("Score: "+ score, 120,40);
  
  }

  function spawnCoins(){

  if (frameCount % 100 === 0){
    var coin = createSprite(300,545,20,20);

    coin.x = Math.round(random(250,500));
    coin.addImage(coinImg);
    coin.scale = 0.1;
    coin.velocityY = -5;

    coin.lifetime = 500;

    coinGroup.add(coin);
}
}

function spawnObstacles() {
  if(frameCount % 50 === 0) {
    var obstacle = createSprite(450,600,10,40);
    
    obstacle.x = Math.round(random(300,400));
    obstacle.velocityY = -3;
    obstacle.addImage(obstacleImg);
            
    obstacle.scale = 0.3;
    obstacle.lifetime = 500;
    
    obstacleGroup.add(obstacle);
  }
}
