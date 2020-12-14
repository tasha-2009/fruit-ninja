
var PLAY=1;
var END=0;
var gameState=1;

var fruit1,fruit2,fruit3,fruit4,fruit;
var sword,swordImage;
var alien,alienImage;
var gameOver,gameOverImage;
var fruitGroup;
var aliensGroup;
var position;

var gameOversound,knifeCut;



function preload(){
  
  swordImage = loadImage("sword.png");
  alienImage = loadAnimation("alien1.png","alien2.png");
  fruit1=loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
  fruit3=loadImage("fruit3.png");
  fruit4=loadImage("fruit4.png");
  
  gameOverImage = loadImage("gameover.png");
  
  gameOversound=loadSound("gameover.mp3");
  knifeCut=loadSound("knifeSwooshSound.mp3");
  
}



function setup() {
  createCanvas(600, 600);
  
  
   sword=createSprite(40,200,20,20);
   sword.addImage(swordImage);
   sword.scale=0.7
  
  
  
  sword.setCollider("rectangle",0,0,40,40);
  
  fruitGroup=createGroup();
  aliensGroup=createGroup();


  
  score=0;
  
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    spawnFruits();
    Enemy();
    
    
    sword.y=World.mouseY;
    sword.x=World.mouseX;
  
    
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score=score+2;
      knifeCut.play();
    }
     else
    {
      
      if(aliensGroup.isTouching(sword)){
        gameState=END;
        gameOversound.play();
        
        fruitGroup.destroyEach();
        aliensGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        aliensGroup.setVelocityXEach(0);
        
        
        sword.addImage(gameOverImage);
        sword.x=200;
        sword.y=200;
      }
    }
  }
  
  drawSprites();
  
 
  text("Score : "+ score,300,30);
}

function spawnFruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    position=Math.round(random(1,2));
    
    if(position===1){
      fruit.x=400;
      fruit.velocityX=-6;  
    }
    else{
      fruit.x=0;
      fruit.velocityX=6;
    }
    
    
    fruit.scale=0.2;
    
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
   
    
    fruit.setLifetime=100;
    
     fruitGroup.add(fruit);
    
  }
}


function Enemy(){
  if(World.frameCount%200===0){
    alien=createSprite(400,200,20,20);
    alien.addAnimation("moving", alienImage);
    alien.y=Math.round(random(100,300));
    alien.velocityX=-8;
    alien.setLifetime=50;
    
    aliensGroup.add(alien);
  }
}
