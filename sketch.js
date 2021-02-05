const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var ground;
var particles = [];
var plinkos = [];
var divisions = [];

var divisionHeight = 300;

var score =0 ;
var particle;
var turn=0;


var gameState = "play";

function setup() {
  createCanvas(480,800);
  createSprite(400, 200, 50, 50);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(480,height,960,20);

  for(var k = 0; k<=width; k = k+80){
    divisions.push(new Division(k, height-divisionHeight/2,10,divisionHeight));
  }

  for (var j=40; j<=width; j=j+50){
    plinkos.push(new Plinko(j,75));
  }
  for (var j=15; j<=width-10; j=j+50){
    plinkos.push(new Plinko(j,175));
  }
  for (var j=40; j<=width; j=j+50){
    plinkos.push(new Plinko(j,275));
  }
  for (var j=15; j<=width-10; j=j+50){
    plinkos.push(new Plinko(j,375));
  }

  
  
}

function draw() {
  background("black");  
  Engine.update(engine);

  noStroke();
  textSize(35);
  fill("white");
  text("Score "+score,width-300,50);

  noStroke();
  textSize(25);
  fill("white");
  text("500",20,520);

  noStroke();
  textSize(25);
  fill("white");
  text("500",100,520);

  noStroke();
  textSize(25);
  fill("white");
  text("200",180,520);

  noStroke();
  textSize(25);
  fill("white");
  text("200",260,520);

  noStroke();
  textSize(25);
  fill("white");
  text("100",330,520);

  noStroke();
  textSize(25);
  fill("white");
  text("100",410,520);
  
  for (var k = 0; k < divisions.length; k++) {

    divisions[k].display();
  }

  for (var j = 0; j < plinkos.length; j++) {

    plinkos[j].display();
  }
  for (var p = 0; p < particles.length; p++) {

    particles[p].display();
  }

  /*if(frameCount%60===0){
    particles.push(new Particle(random(width/2-10, width/2+10),10, 10));
  }*/

  if(particle !=null){
    particle.display();
    if(particle.body.position.y>760){
      if(particle.body.position.x <200){
        score = score+500;
        particle = null;
        if(turn>=5)gameState ="end";
      }  
  
      if(particle.body.position.x >301 && particle.body.position.x<600){
        score = score+100;
        particle = null;
        if(turn>=5)gameState ="end";
      }
    }
  }
  ground.display();
}

function keyPressed(){

  if(gameState!== "end" && keyCode===32){
    turn++;
    particle = new Particle(mouseX,10,10,10);
  }
}
