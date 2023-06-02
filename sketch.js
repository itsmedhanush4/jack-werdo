var path,boy, leftBoundary,rightBoundary;
var pathImg,boyImg;
var bomb,bombImg;
var eD,eDImg;
var coin,coinImg;
var power, powerImg;
var gamestate="play"
var score=0;
var bombGroup,bomb;
var collectGroup,coin,eD,power;

function preload(){
  pathImg = loadImage("path.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  bombImg=loadImage("bomb.png");
  eDImg=loadImage("energyDrink.png");
  coinImg=loadImage("coin.png");
  powerImg=loadImage("power.png");
}

function setup(){
  
  createCanvas(400,700);
  
  // Moving background
  path=createSprite(200,350);
  path.addImage(pathImg);
  path.velocityY = 4;
  path.scale=1.2;

  //creating boy running
  boy = createSprite(180,650,30,30);
  boy.scale=0.08;
  boy.addAnimation("JakeRunning",boyImg);

  leftBoundary=createSprite(0,0,100,800);
  leftBoundary.visible = false;


  rightBoundary=createSprite(410,0,100,800);
  rightBoundary.visible = false;

  collectGroup=createGroup();
  bombGroup=createGroup();
}

function draw() {
  background(0);
  

  if(gamestate=="play"){

    path.velocityY = 4;
  
    boy.x = World.mouseX;
    
    edges= createEdgeSprites();
    boy.collide(edges[3]);
    boy.collide(leftBoundary);
    boy.collide(rightBoundary);

    if(frameCount%60 == 0){
      var num=Math.round(random(1,4));
      if(num==1){
        bombe();
      }
      else if(num==2){
        energuy();
      }
      else if(num==3){
        coine();
      }
      else{
        powere();
      }
  
    }

    if(path.y > 400 ){
      path.y = height/2;
    }
      
    if(boy.isTouching(collectGroup)){
      score=score+1
    }

    if(boy.isTouching(bombGroup)){
      gamestate="end";
    }
    drawSprites();
  }

  if(gamestate=="end"){
    textSize(30)
    fill("white")
    text("GAME OVER !!! ", 100,350)
  }
  
  
  
  textSize(15);
  fill("yellow")
  text("SCORE : "+score,50,50);
}


function bombe(){
  bomb= createSprite(random(50,350),0);
  bomb.addImage(bombImg);
  bomb.velocityY= 5;
  bomb.scale= 0.08;
  bomb.lifetime= 500;
  bombGroup.add(bomb);
}

function energuy(){
  eD= createSprite(random(50,350),0);
  eD.addImage(eDImg);
  eD.velocityY= 5;
  eD.scale=0.08;
  collectGroup.add(eD);
  eD.lifetime= 500;
}

function coine(){
  coin= createSprite(random(50,350),0);
  coin.addImage(coinImg);
  coin.velocityY= 5;
  coin.scale=0.4;
  collectGroup.add(coin);
  coin.lifetime=500
}

function powere(){
  power= createSprite(random(50,350),0);
  power.addImage(powerImg);
  power.velocityY= 5;
  power.scale=0.08;
  collectGroup.add(power);
  power.lifetime=500
}


