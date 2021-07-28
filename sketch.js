var backImage, backgr;
var player, player_running;
var ground, ground_img;
var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;
var gameOver;
var score = 0;

function preload() {
  backImage = loadImage("jungleback.jpg");
  player_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  bananaImage = loadImage("banana.png");
  obstacle_img = loadImage("obstacle.png");
}

function setup() {
  createCanvas(800, 400);
  backgr = createSprite(0, 0, 800, 400);
  backgr.addImage(backImage);
  backgr.scale = 1.5;
  backgr.x = backgr.width / 2;
  backgr.velocityX = -4;
  player = createSprite(80, 280, 20, 50);
  player.addAnimation("Running", player_running);
  player.scale = 0.1;

  ground = createSprite(400, 350, 800, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  ground.visible = false;
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  score = 0;
}

function draw() {
  background(255);
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  if (backgr.x < 100) {
    backgr.x = backgr.width / 2;
  }
  if (FoodGroup.isTouching(player)) {
    FoodGroup.destroyEach();
    score = score + 2;
  }
  switch (score) {
    case 10:
      player.scale = 0.12;
      break;
    case 20:
      player.scale = 0.14;
      break;
    case 30:
      player.scale = 0.16;
      break;
    case 40:
      player.scale = 0.18;
      break;
    default:
      break;
  }
  if (keyDown("space")) {
    player.velocityY = -12;
  }
  player.velocityY = player.velocityY + 0.8;
  player.collide(ground);
  spawnFood();
  obstacles();
  if (obstaclesGroup.isTouching(player)) {
    player.scale = 0.08;
    player.destroy();
    banana.velocityX = 0;
    obstacle.velocityX = 0;
    background("black");
    backgr.destroy();
    text("GameOver", 300, 300);
  }

  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);
}

function spawnFood() {
  if (frameCount % 100 === 0) {
    banana = createSprite(500, 200, 20, 20);
    banana.y = Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.velocityX = -4;
    banana.scale = 0.1;
    banana.lifetime = 120;

    FoodGroup.add(banana);
  }
}

function obstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(500, 315, 20, 20);
    obstacle.addImage(obstacle_img);
    obstacle.velocityX = -4;
    obstacle.scale = 0.15;
    obstacle.lifetime = 120;

    obstaclesGroup.add(obstacle);
  }
}